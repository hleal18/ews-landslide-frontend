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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
}));


export default function DashboardFilters({ 
    criticalPoints = emptyObject, 
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
                        <Grid item container xs={4} justify="center">
                        <SelectForm 
                            id={criticalPoints.id}
                            label={criticalPoints.label}
                            value={criticalPoints.value}
                            names={criticalPoints.names}
                            options={criticalPoints.options}                            
                            handleChange={handleChange}
                        />
                        </Grid>                        
                        <Grid item container xs={4} justify="center">
                        <SelectForm
                            id={devices.id}
                            label={devices.label}
                            value={devices.value}
                            names={devices.names}
                            options={devices.options}
                            handleChange={handleChange}
                        />
                        </Grid>
                        <Grid item container xs={4} justify="center">
                        <SelectForm 
                            id={variables.id}
                            label={variables.label}
                            value={variables.value}
                            names={variables.names}
                            options={variables.options}
                            handleChange={handleChange}
                        />
                        </Grid>
                    </Grid>
                </Toolbar>  
            </AppBar>
        </div>
    )
}