import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import './App.css';
import AppBar from './AppBar';
import SignIn from './Container/SignInSide';
import SignUp from './Container/SignUp';
import DeviceCards from './Presentational/Info/DeviceCards';
import Dashboard from './Dashboard2';
import DashboardFilters from './Container/DashboardFiltersBars';
import { grey } from '@material-ui/core/colors';
import RiskZonesCardsManager from './Container/RiskZoneCardsManager';
import CriticalPointCardsManager from './Container/CriticalPointCardsManager';
import DeviceCardsManager from './Container/DeviceCardsManager';
import VariableCardsManager from './Container/VariableCardsManager';
import ConditionalLogin from './ConditionalLogin';

// Contexts
import { AuthProvider, AuthConsumer, useAuthenticated } from './Contexts/AuthContext';
import { UserProvider, UserConsumer } from './Contexts/UserContext';
import { RiskZonesProvider, RiskZonesConsumer } from './Contexts/RiskZonesContext';

function App() {    
    return (
        <Router>
            <Switch>
                <AuthProvider >
                    <Route path="/dashboard">
                        <Grid container direction="column">
                            <Grid item xs={12}>
                                <AppBar />
                                <Grid item xs={12}>
                                    <DashboardFilters />
                                </Grid>
                            </Grid>
                            <Grid item xs color={grey[900]}>
                                <Dashboard />
                            </Grid>
                        </Grid>
                    </Route>
                    <Route path="/riskzones/:riskZoneId/criticalspots/:criticalSpotId/sensornodes/:sensorNodeId/variables">
                        <Grid container direction="column">
                            <Grid item xs>
                                <AppBar />
                            </Grid>
                            <Grid item xs>
                                <VariableCardsManager />
                            </Grid>
                        </Grid>
                    </Route>
                    <Route path="/riskzones/:riskZoneId/criticalspots/:criticalSpotId/sensornodes">
                        <Grid container direction="column">
                            <Grid item xs>
                                <AppBar />
                            </Grid>
                            <Grid item xs>
                                <DeviceCardsManager />
                            </Grid>
                        </Grid>
                    </Route>
                    <Route path="/riskzones/:riskZoneId/criticalspots">
                        <Grid container direction="column">
                            <Grid item xs>
                                <AppBar />
                            </Grid>
                            <Grid item xs>
                                <RiskZonesProvider>
                                    <RiskZonesConsumer>
                                        {
                                            (context) => <CriticalPointCardsManager context={context} />
                                        }
                                    </RiskZonesConsumer>
                                </RiskZonesProvider>
                            </Grid>
                        </Grid>
                    </Route>
                    <Route path="/riskzones">
                        <Grid container direction="column">
                            <Grid item xs>
                                <AppBar />
                            </Grid>
                            <Grid item xs>
                                <RiskZonesProvider>
                                    <RiskZonesCardsManager />
                                </RiskZonesProvider>
                            </Grid>
                        </Grid>
                    </Route>
                    
                    
                    
                    <Route path="/login" exact>
                        <ConditionalLogin />
                    </Route>
                    <Route path="/signup" exact>
                        <SignUp />
                    </Route>
                    <Route path="/" exact>
                        <ConditionalLogin />
                    </Route>
                </AuthProvider>
            </Switch>
        </Router>
    );
}

export default App;
