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
            const riskZones = await ewsApi.getRiskZones(token);
            const criticalSpots = await ewsApi.getCriticalSpots(token);
            const sensorNodes = await ewsApi.getSensorNodes(token);
            console.log('Sensor Nodes on context: ', sensorNodes);
            // It modifies the original riskZone object from API to contain
            // composed objects with info about: criticalSpots->SensorNodes
            // ->Variables.
            const riskZonesAppData = riskZones.map((riskZone) => {
                const composedCriticalSpots = criticalSpots.map((criticalSpot) => {
                    const filteredSensorNodes = sensorNodes.filter((sensorNode) => criticalSpot._id === sensorNode.criticalSpotId)

                    return {
                        ...criticalSpot,
                        sensorNodes: filteredSensorNodes
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
        /*
        * Extract criticalSpotId.
        * Find index of rizkZone that contains criticalSpotId.
        * Find criticalSpotIndex within the riskZone that will
        * contain the new sensorNode.
        * Create function with prevState to update
        * Access riskZone at index, criticalPoint at index and push
        * new sensorNode.
        * return newState.
        */
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

export const RiskZonesConsumer = RiskZonesContext.Consumer;
export default RiskZonesContext;