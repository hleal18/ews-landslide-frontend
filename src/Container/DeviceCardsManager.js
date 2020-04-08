import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import DeviceCardsPresentation from '../Presentational/Info/DeviceCards';
import DeviceAddFormManager from './DeviceAddFormManager';
import RiskZonesContext, { useSensorNodeUpdater } from '../Contexts/RiskZonesContext';
import AuthContext from '../Contexts/AuthContext';

export default () => {
    const { riskZones } = useContext(RiskZonesContext);
    const { token } = useContext(AuthContext);
    const { riskZoneId, criticalSpotId } = useParams();
    const setSensorNode = useSensorNodeUpdater();
    
    const [showingAddForm, setShowingAddForm] = useState(false);
    
    const currentRiskZone = riskZones.find((riskZone) => riskZone._id === riskZoneId);
    
    let sensorNodes = [];
    let currentCriticalSpot = undefined;
    if (currentRiskZone) {
        currentCriticalSpot = currentRiskZone.criticalSpots.find(
            (criticalSpot) => 
                criticalSpot._id === criticalSpotId
        );
        sensorNodes = currentCriticalSpot.sensorNodes ? currentCriticalSpot.sensorNodes : [];
    }
        
    return (
        <div>
            <DeviceCardsPresentation
                sensorNodes={sensorNodes}
                handleOpenAddMenu={() => (setShowingAddForm(true))}
            />
            <DeviceAddFormManager
                criticalSpotId={criticalSpotId}
                criticalSpotName={currentCriticalSpot ? currentCriticalSpot.name : ''}
                token={token}
                showAddForm={showingAddForm}
                handleClose={() => (setShowingAddForm(false))}
                setSensorNode={setSensorNode}
            />
        </div>
    )
}