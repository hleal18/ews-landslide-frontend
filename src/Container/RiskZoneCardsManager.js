import React, { useContext } from 'react';
import RiskZonesContext from '../Contexts/RiskZonesContext';
import RiskZoneCards from '../Presentational/Info/RiskZoneCards';

export default ({  }) => {
    const { riskZones } = useContext(RiskZonesContext);
    console.log(`riskZones: `, riskZones);
    
    return (
        <div>
            <RiskZoneCards riskZones={riskZones} />
        </div>
    )
}
