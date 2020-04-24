import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import ewsApi from '../Api/ewsApi';

const RiskZonesContext = React.createContext({
    riskZones: [],
    setRiskZones: () => { }
});

export const RiskZonesProvider = (props) => {
    const [riskZones, setRiskZones] = useState([]);

    const { token } = useContext(AuthContext);

    useEffect(() => {
        const getRiskZones = async () => {
            let riskZones = [];
            let criticalSpots = [];
            let sensorNodes = [];
            let thresholds = [];
            try {
                riskZones = await ewsApi.getRiskZones(token);
                criticalSpots = await ewsApi.getCriticalSpots(token);
                sensorNodes = await ewsApi.getSensorNodes(token);
                thresholds = await ewsApi.getThresholds(token);
                console.log('Thresholds: ', thresholds);
            } catch (e) { console.log(`Error: ${e.message}`); }
            
            // It modifies the original riskZone object from API to contain
            // composed objects with info about: criticalSpots->SensorNodes
            // ->Variables.
            const riskZonesAppData = riskZones.map((riskZone) => {
                const composedCriticalSpots = criticalSpots.map((criticalSpot) => {
                    //const filteredSensorNodes = sensorNodes.filter((sensorNode) => criticalSpot._id === sensorNode.criticalSpotId)
                    const composedSensorNodes = sensorNodes.map((sensorNode) => {
                        const composedVariables = sensorNode.variables.map((variable) => {
                            const currentThreshold = thresholds.find(threshold => threshold.variableId === variable._id);
                            return {
                                ...variable,
                                threshold: currentThreshold
                            }
                        });
                        return {
                            ...sensorNode,
                            variables: composedVariables
                        }
                    });
                    console.log('Composed sensor nodes: ', composedSensorNodes);
                    return {
                        ...criticalSpot,
                        sensorNodes: composedSensorNodes
                    }
                });

                const criticalSpotsForRiskZone = composedCriticalSpots.filter((criticalSpot) =>
                    riskZone._id === criticalSpot.riskZoneId);

                const composedRiskZone = {
                    ...riskZone,
                    criticalSpots: criticalSpotsForRiskZone
                }
                return composedRiskZone;
            });
            
            setRiskZones(riskZonesAppData);
        }
        getRiskZones();
    }, [token]);

    return (
        <RiskZonesContext.Provider value={{ riskZones, setRiskZones }}>
            {props.children}
        </RiskZonesContext.Provider>
    )
}

export const useCriticalSpotUpdater = () => {
    const { riskZones, setRiskZones } = useContext(RiskZonesContext);

    // Function to add a new critical spot to a specified riskZone.
    return (criticalSpot) => {
        // Every new criticalSpot to be added into the context
        // should be initialized with an empty sensorNode array.
        criticalSpot.sensorNodes = [];
        const { riskZoneId } = criticalSpot;
        const riskZoneIndex = riskZones.findIndex((riskZone) => riskZone._id === riskZoneId);
        setRiskZones((prevState) => {
            const newState = [...prevState]
            newState[riskZoneIndex].criticalSpots.push(criticalSpot);
            return newState;
        });
    }
}

export const useSensorNodeUpdater = () => {
    const { riskZones, setRiskZones } = useContext(RiskZonesContext);

    return (sensorNode) => {
        const { criticalSpotId } = sensorNode;
        let criticalSpotIndex = null;

        const riskZoneIndex = riskZones.findIndex((riskZone) => {
            criticalSpotIndex = riskZone.criticalSpots.findIndex(
                (criticalSpot) => criticalSpot._id === criticalSpotId
            );

            if (criticalSpotIndex !== -1) return true;

            return false;
        });

        setRiskZones((prevState) => {
            const newState = [...prevState];
            newState[riskZoneIndex].criticalSpots[criticalSpotIndex].sensorNodes.push(sensorNode);
            return newState;
        });
    }
}

export const useVariableUpdater = () => {
    const { riskZones, setRiskZones } = useContext(RiskZonesContext);

    return (sensorNode, variable) => {
        const { criticalSpotId } = sensorNode;
        let sensorNodeIndex = null;
        let criticalSpotIndex = null;

        const riskZoneIndex = riskZones.findIndex((riskZone) => {
            criticalSpotIndex = riskZone.criticalSpots.findIndex((criticalSpot) => { 
                return criticalSpot._id === criticalSpotId;
            });

            if (criticalSpotIndex !== -1) {
                sensorNodeIndex = riskZone.criticalSpots[criticalSpotIndex].sensorNodes.findIndex((sensorNodeContext) => {
                    return sensorNodeContext._id === sensorNode._id;
                });
                return true;
            }

            return false;
        });

        setRiskZones((prevState) => {
            const newState = [...prevState];
            newState[riskZoneIndex].criticalSpots[criticalSpotIndex].sensorNodes[sensorNodeIndex].variables.push(variable);
            return newState;
        });
    }
}

export const RiskZonesConsumer = RiskZonesContext.Consumer;
export default RiskZonesContext;