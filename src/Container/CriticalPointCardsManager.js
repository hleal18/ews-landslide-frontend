import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import CriticalPointCardsPresentation from '../Presentational/Info/CriticalPointCards';
import CriticalPointCardsAddFormManager from './CriticalPointAddFormManager';
import RiskZonesContext, { useCriticalSpotUpdater } from '../Contexts/RiskZonesContext';
import AuthContext from '../Contexts/AuthContext';

export default () => {
    const { riskZones } = useContext(RiskZonesContext);
    const { token } = useContext(AuthContext);
    const { riskZoneId } = useParams();
    const setCriticalSpot = useCriticalSpotUpdater();
    const [showingAddForm, setShowingAddForm] = useState(false);
    
    const currentRiskZone = riskZones.find((riskZone) => riskZone._id === riskZoneId);
    const criticalSpots = (currentRiskZone) ? currentRiskZone.criticalSpots : [];

    return (
        <div>
            <CriticalPointCardsPresentation
                criticalPoints={criticalSpots}                
                handleOpenAddMenu={() => (setShowingAddForm(true))}
            />
            <CriticalPointCardsAddFormManager
                setCriticalSpot={setCriticalSpot}
                showAddForm={showingAddForm}
                handleClose={() => (setShowingAddForm(false))}
                riskZoneId={riskZoneId}
                riskZoneName={currentRiskZone ? currentRiskZone.name : ''}
                token={token}
            />
        </div>)
}