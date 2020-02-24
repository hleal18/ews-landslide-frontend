import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import './App.css';
import AppBar from './AppBar';

import SignIn from './Container/SignInSide';
import SignUp from './Container/SignUp';
import DeviceCards from './Presentational/Info/DeviceCards';
import CriticalPointCards from './Presentational/Info/CriticalPointCards';
import Dashboard from './Dashboard2';
import LineChartStatic from './Presentational/Charts/LineChartStatic';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
            <Grid container direction="column">
                <Grid item xs>
                    <AppBar />
                </Grid>
                <Grid item xs>
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
                    <CriticalPointCards criticalPoints={[1, 2, 3, 4, 5, 6, 7, ]}/>
                </Grid>
            </Grid>
        </Route>
        <Route path="/devices">
            <Grid container direction="column">
                <Grid item xs>
                    <AppBar />
                </Grid>
                <Grid item xs>
                    <DeviceCards devices={[1, 2, 3, 4, 5, 6, 7]} />
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
