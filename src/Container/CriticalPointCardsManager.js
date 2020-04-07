import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import CriticalPointCardsPresentation from '../Presentational/Info/CriticalPointCards';
import CriticalPointCardsAddFormManager from './CriticalPointAddFormManager';
import RiskZonesContext from '../Contexts/RiskZonesContext';

export default () => {
    const { riskZones } = useContext(RiskZonesContext);
    const { riskZoneId } = useParams();
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
                showAddForm={showingAddForm}
                handleClose={() => (setShowingAddForm(false))}
            />
        </div>)
}