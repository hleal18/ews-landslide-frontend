import React, { useContext, useState } from 'react';
import RiskZonesContext from '../Contexts/RiskZonesContext';
import RiskZoneCards from '../Presentational/Info/RiskZoneCards';
import RiskZoneAddFormManager from './RiskZoneAddFormManager';
import AuthContext from '../Contexts/AuthContext';

export default () => {
    const { riskZones, setRiskZones } = useContext(RiskZonesContext);
    const { token } = useContext(AuthContext);
    const [showingAddMenu, setShowingAddMenu] = useState(false);
    
    return (
        <div>
            <RiskZoneCards riskZones={riskZones}  handleOpenAddMenu={() => (setShowingAddMenu(true))} />
            <RiskZoneAddFormManager 
                riskZones={riskZones} 
                setRiskZones={setRiskZones} 
                showAddForm={showingAddMenu} 
                handleClose={() => (setShowingAddMenu(false))} 
                token={token} 
            />
        </div>
    )
}
