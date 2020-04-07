import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import ewsApi from '../Api/ewsApi';

const RiskZonesContext = React.createContext({
    riskZones: [],
    setRiskZones: () => {}
});

export const RiskZonesProvider = (props) => {
    const [riskZones, setRiskZones] = useState([]);
    
    const { token } = useContext(AuthContext);
    
    useEffect(() => {
        const getRiskZones = async () => {
            const riskZones = await ewsApi.getRiskZones(token);
            const criticalSpots = await ewsApi.getCriticalSpots(token);
            
            // It modifies the original riskZone object from API to contain
            // composed objects with info about: criticalSpots->SensorNodes
            // ->Variables.
            const riskZonesAppData = riskZones.map((riskZone) => {
                const criticalSpotsForRiskZone = criticalSpots.filter((criticalSpot) => 
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


export const RiskZonesConsumer = RiskZonesContext.Consumer;
export default RiskZonesContext;