import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VariableCardsPresentation from '../Presentational/Info/VariableCards';
import VariableAddFormManager from './VariableAddFormManager';
import VariableConfigureFormManager from './VariableConfigureFormManager';
import AuthContext from '../Contexts/AuthContext';
import RiskZonesContext, { useSensorNodeUpdater } from '../Contexts/RiskZonesContext';

export default () => {
    const { riskZones } = useContext(RiskZonesContext);
    const { token } = useContext(AuthContext);
    const { riskZoneId, criticalSpotId, sensorNodeId } = useParams();
    const setSensorNode = useSensorNodeUpdater();
    
    const [showingAddForm, setShowingAddForm] = useState(false);
    const [showingConfigureForm, setShowingConfigureForm] = useState(false);
    
    const [variables, setVariables] = useState([]);
    const [idSensorsTaken, setIdSensorsTaken] = useState(new Set());
    
    
    
    useEffect(() => {
        const currentRiskZone = riskZones.find((riskZone) => riskZone._id === riskZoneId);
        
        if (currentRiskZone) {
            const { criticalSpots } = currentRiskZone;
            
            const { sensorNodes } = criticalSpots.find((criticalSpot) => criticalSpot._id === criticalSpotId);
            
            const { variables } = sensorNodes.find((sensorNode) => sensorNode._id === sensorNodeId);
            console.log('Variables in sensorNode: ', variables);
            setVariables(variables);            
            setIdSensorsTaken(variables.reduce((curSet, variable) => {
                curSet.add(variable.idSensor);
                return curSet;
            }, new Set()))
        }    
    }, [riskZoneId, criticalSpotId, sensorNodeId, riskZones]);
    
    
    return (
        <div>
            <VariableCardsPresentation
                variables={variables}
                handleOpenAddMenu={() => (setShowingAddForm(true))}
                handleOpenConfigureMenu={() => (setShowingConfigureForm(true))}
            />
            <VariableConfigureFormManager
                showDialog={showingConfigureForm}
                handleClose={() => (setShowingConfigureForm(false))}
            />
            <VariableAddFormManager
                token={token}
                idSensorsTaken={idSensorsTaken}
                sensorNodeId={sensorNodeId}
                setSensorNode={setSensorNode}
                showAddForm={showingAddForm}
                handleClose={() => (setShowingAddForm(false))}
            />
        </div>
    )
}