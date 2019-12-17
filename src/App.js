import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from './AppBar';
import Dashboard2 from './Dashboard2';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import DatePicker from './DatePicker';

function App() {
    return (
        <React.Fragment>
            <CssBaseline>
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <AppBar></AppBar>
                        </Grid>
                        <Grid item xs={12}>
                            <Dashboard2></Dashboard2>
                        </Grid>
                    </Grid>
                </div>
            </CssBaseline>
        </React.Fragment>
    );
}

export default App;
