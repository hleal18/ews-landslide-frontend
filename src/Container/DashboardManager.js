import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { grey } from '@material-ui/core/colors';

import RiskZonesContext from '../Contexts/RiskZonesContext';

import AppBar from '../AppBar';
import Dashboard from '../Dashboard2';
import DashboardFilters from '../Container/DashboardFiltersBars';


const DashboardManager= () => {
    const { riskZones } = useContext(RiskZonesContext);
    const [selectedRiskZone, setSelectedRiskZone] = useState({});
    
    return (
        <div>
            <Grid container direction="column">
                <Grid item xs={12}>
                    <AppBar />
                    <Grid item xs={12}>
                        <DashboardFilters
                            riskZones={riskZones}
                            setSelectedRiskZone={setSelectedRiskZone}
                        />
                    </Grid>
                </Grid>
                <Grid item xs color={grey[900]}>
                    <Dashboard selectedRiskZone={selectedRiskZone}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default DashboardManager;