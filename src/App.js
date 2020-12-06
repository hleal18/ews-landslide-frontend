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
import Signout from './Signout';
import DeviceCards from './Presentational/Info/DeviceCards';
import Dashboard from './Dashboard2';
import DashboardManager from './Container/DashboardManager'
import DashboardFilters from './Container/DashboardFiltersBars';
import { grey } from '@material-ui/core/colors';
import RiskZonesCardsManager from './Container/RiskZoneCardsManager';
import CriticalPointCardsManager from './Container/CriticalPointCardsManager';
import DeviceCardsManager from './Container/DeviceCardsManager';
import VariableCardsManager from './Container/VariableCardsManager';
import ConditionalLogin from './ConditionalLogin';
import ExportManager from './Container/ExportManager';
import AlertsManager from './Container/AlertsManager';

// Contexts
import { AuthProvider, AuthConsumer, useAuthenticated } from './Contexts/AuthContext';
import { UserProvider, UserConsumer } from './Contexts/UserContext';
import { RiskZonesProvider, RiskZonesConsumer } from './Contexts/RiskZonesContext';
import AuthTransition from './AuthTransition';

function App() {
    return (
        <Router>
            <Switch>
                <AuthProvider >
                    <RiskZonesProvider>
                        <Route path="/export">
                            <Grid container direction="column">
                                <Grid item xs>
                                    <AppBar />
                                </Grid>
                                <Grid item xs>
                                    <ExportManager />
                                </Grid>
                            </Grid>
                        </Route>
                        <Route path="/alerts">
                            <Grid container direction="column">
                                <Grid item xs>
                                    <AppBar />
                                </Grid>
                                <Grid item xs>
                                    <AlertsManager />
                                </Grid>
                            </Grid>
                        </Route>
                        <Route path="/dashboard">
                            <DashboardManager />
                        </Route>
                        <Route path="/riskzones/:riskZoneId/criticalspots/:criticalSpotId/sensornodes/:sensorNodeId/variables" exact>
                            <Grid container direction="column">
                                <Grid item xs>
                                    <AppBar />
                                </Grid>
                                <Grid item xs>
                                    <VariableCardsManager />
                                </Grid>
                            </Grid>
                        </Route>
                        <Route path="/riskzones/:riskZoneId/criticalspots/:criticalSpotId/sensornodes" exact>
                            <Grid container direction="column">
                                <Grid item xs>
                                    <AppBar />
                                </Grid>
                                <Grid item xs>
                                    <DeviceCardsManager />
                                </Grid>
                            </Grid>
                        </Route>
                        <Route path="/riskzones/:riskZoneId/criticalspots" exact>
                            <Grid container direction="column">
                                <Grid item xs>
                                    <AppBar />
                                </Grid>
                                <Grid item xs>
                                    <CriticalPointCardsManager />
                                </Grid>
                            </Grid>
                        </Route>
                        <Route path="/riskzones" exact>
                            <Grid container direction="column">
                                <Grid item xs>
                                    <AppBar />
                                </Grid>
                                <Grid item xs>
                                    <RiskZonesCardsManager />
                                </Grid>
                            </Grid>
                        </Route>
                        <Route path="/login" exact>
                            <ConditionalLogin />
                        </Route>
                        <Route path="/signup" exact>
                            <SignUp />
                        </Route>
                        <Route path="/signout" exact>
                            <Signout />
                        </Route>
                        <Route path="/" exact>
                            <ConditionalLogin />
                        </Route>
                    </RiskZonesProvider>
                </AuthProvider>
            </Switch>
        </Router>
    );
}

export default App;
