import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VariableCardsPresentation from '../Presentational/Info/VariableCards';
import VariableAddFormManager from './VariableAddFormManager';
import VariableConfigureFormManager from './VariableConfigureFormManager';
import AuthContext from '../Contexts/AuthContext';
import RiskZonesContext, { } from '../Contexts/RiskZonesContext';

export default () => {
    const { riskZones } = useContext(RiskZonesContext);
    const { token } = useContext(AuthContext);
    const { riskZoneId, criticalSpotId, sensorNodeId } = useParams();
    
    const [showingAddForm, setShowingAddForm] = useState(false);
    const [showingConfigureForm, setShowingConfigureForm] = useState(false);
    
    const [variables, setVariables] = useState([]);
    
    
    
    useEffect(() => {
        const currentRiskZone = riskZones.find((riskZone) => riskZone._id === riskZoneId);
        
        if (currentRiskZone) {
            const { criticalSpots } = currentRiskZone;
            
            const { sensorNodes } = criticalSpots.find((criticalSpot) => criticalSpot._id === criticalSpotId);
            
            const { variables } = sensorNodes.find((sensorNode) => sensorNode._id === sensorNodeId);
            
            setVariables(variables);
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
                showAddForm={showingAddForm}
                handleClose={() => (setShowingAddForm(false))}
            />
        </div>
    )
}