import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import DatePicker from './DatePicker';
import logo from './logo.svg';
import './App.css';
import AppBar from './AppBar';
import Dashboard2 from './Dashboard2';

import SignIn from './SignInSide';
import SignUp from './SignUp';
import PrivateRoute from './PrivateRoute';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <CssBaseline>
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <AppBar />
                </Grid>
                <Grid item xs={12}>
                  <Dashboard2 />
                </Grid>
              </Grid>
            </div>
          </CssBaseline>
        </Route>
        <Route path="/login">
          <SignIn />
        </Route>
        <Route path="/signup">
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
