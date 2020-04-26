import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import SelectForm from './SelectForm';
import { Grid } from '@material-ui/core';

const emptyObject= {
    value: '',
    names: [],
    options: [],
    label: 'default',
    id: 'default'
};

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: grey[100],
        marginBottom: 24
    }
}));


export default function DashboardFilters({
    riskZones = emptyObject, 
    criticalSpots = emptyObject, 
    devices = emptyObject, 
    variables = emptyObject,
    handleChange
}) {
    const classes = useStyles();
    
    return (
        <div >
            <AppBar position="static" className={classes.root} >
                <Toolbar>
                    <Grid container direction="row">
                        <Grid item container xs={3} justify="center">
                            <SelectForm
                                id={riskZones.id}
                                label={riskZones.label}
                                value={riskZones.value}
                                names={riskZones.names}
                                options={riskZones.options}
                                handleChange={handleChange}
                                disabled={riskZones.disabled}
                            />
                        </Grid>
                        <Grid item container xs={3} justify="center">
                        <SelectForm 
                            id={criticalSpots.id}
                            label={criticalSpots.label}
                            value={criticalSpots.value}
                            names={criticalSpots.names}
                            options={criticalSpots.options}                            
                            handleChange={handleChange}
                            disabled={criticalSpots.disabled}    
                        />
                        </Grid>                        
                        <Grid item container xs={3} justify="center">
                        <SelectForm
                            id={devices.id}
                            label={devices.label}
                            value={devices.value}
                            names={devices.names}
                            options={devices.options}
                            handleChange={handleChange}
                            disabled={devices.disabled}
                        />
                        </Grid>
                        <Grid item container xs={3} justify="center">
                        <SelectForm 
                            id={variables.id}
                            label={variables.label}
                            value={variables.value}
                            names={variables.names}
                            options={variables.options}
                            handleChange={handleChange}
                            disabled={variables.disabled}
                        />
                        </Grid>
                    </Grid>
                </Toolbar>  
            </AppBar>
        </div>
    )
}