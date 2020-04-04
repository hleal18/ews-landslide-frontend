import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import ewsApi from '../Api/ewsApi';

const RiskZonesContext = React.createContext({
    token: undefined,
    setToken: () => {}
});

export const RiskZonesProvider = (props) => {
    const [riskZones, setRiskZones] = useState({});
    const { token } = useContext(AuthContext);
    console.log(`Token: `, token);
    
    useEffect(() => {
        const getRiskZones = async () => {
            const { riskZones } = await ewsApi.getRiskZones(token);
            console.log('Riskzones received: ', riskZones);
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