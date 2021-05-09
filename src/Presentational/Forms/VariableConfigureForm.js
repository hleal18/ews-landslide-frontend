import React from 'react';

import DialogForm from './DialogForm';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { variablesDefinitionsAsObjectWithUnits } from '../../lib/variablesDefinition';

export default (props) => {
    const currentVariable = props.variables.find((v) => v._id === props.variableId);
    return <div>
        <DialogForm
            contextText='Introduzca los umbrales deseados'
            title={currentVariable?.name}
            showDialog={props.showDialog}
            handleClose={props.handleClose}
            handleSubmit={props.handleSubmit}
            maxWidth='md'
            >
            {props.showDialog && console.log('Props thresholds: ', props)}
            <Grid container justify='center' direction='row' spacing={3}>
                <Grid item >
                    <TextField
                        autoFocus
                        margin="dense"
                        size="small"
                        variant="outlined"
                        id="lowerBound"
                        label="Umbral Inferior"
                        value={props.input.lowerBound}
                        onChange={props.handleText}
                        helperText={props.errorState.lowerBound}
                        error={!!props.errorState.lowerBound}
                    />
                </Grid>
                <Grid item style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Typography component='p' color='textPrimary' >  {'<   '} <i> {variablesDefinitionsAsObjectWithUnits[currentVariable?.type]} </i> {'   <'} </Typography>
                </Grid>
                <Grid item >
                    <TextField
                        margin="dense"
                        size="small"
                        variant="outlined"
                        id="upperBound"
                        label="Umbral Superior"
                        value={props.input.upperBound}
                        onChange={props.handleText}
                        helperText={props.errorState.upperBound}
                        error={!!props.errorState.upperBound}
                    />
                </Grid>

            </Grid>
            {
                props.isLoading &&

                <Grid container justify='center' item >
                    <div >
                        <CircularProgress />
                    </div>
                </Grid>
            }
        </DialogForm>
    </div>
};