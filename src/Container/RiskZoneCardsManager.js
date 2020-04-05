import React, { useContext, useState } from 'react';
import RiskZonesContext from '../Contexts/RiskZonesContext';
import RiskZoneCards from '../Presentational/Info/RiskZoneCards';
import RiskZoneAddFormManager from './RiskZoneAddFormManager';

export default () => {
    const { riskZones } = useContext(RiskZonesContext);
    const [showingAddMenu, setShowingAddMenu] = useState(false);
    console.log(`riskZones: `, riskZones);
    console.log(`showingAddmenu: `, riskZones);
    return (
        <div>
            <RiskZoneCards riskZones={riskZones}  handleOpenAddMenu={() => (setShowingAddMenu(true))} />
            <RiskZoneAddFormManager showAddForm={showingAddMenu} handleClose={() => (setShowingAddMenu(false))}/>
        </div>
    )
}
