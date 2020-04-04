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
            const { riskZones } = await ewsApi.getRiskZones(token);
            setRiskZones(riskZones);
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