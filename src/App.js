import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
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
import CriticalPointCardsManager from './Container/CriticalPointCardsManager';
import DeviceCardsManager from './Container/DeviceCardsManager';
import VariableCardsManager from './Container/VariableCardsManager';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
            <Grid container direction="column">
                <Grid item xs={12}>
                    <AppBar />
                <Grid item xs={12}>
                    <DashboardFilters/>
                </Grid>
                </Grid>
                <Grid item xs color={grey[900]}>
                    <Dashboard />
                </Grid>
            </Grid>
        </Route>
        <Route path="/critical_points">
            <Grid container direction="column">
                <Grid item xs>
                    <AppBar />
                </Grid>
                <Grid item xs>
                    <CriticalPointCardsManager />
                </Grid>
            </Grid>
        </Route>
        <Route path="/devices">
            <Grid container direction="column">
                <Grid item xs>
                    <AppBar />
                </Grid>
                <Grid item xs>
                    <DeviceCardsManager />
                </Grid>
            </Grid>
        </Route>
        <Route path="/variables">
            <Grid container direction="column">
                <Grid item xs>
                    <AppBar />
                </Grid>
                <Grid item xs>
                    <VariableCardsManager />
                </Grid>
            </Grid>
        </Route>
        <Route path="/login" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/">
          <SignIn />
        </Route>
        
      </Switch>

    </Router>
  );
}

export default App;
