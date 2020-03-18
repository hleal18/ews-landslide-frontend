import React from 'react';

import DialogForm from './DialogForm';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

export default (props) => (
    <div>
        <DialogForm
            contextText='Introduzca los umbrales deseados'
            showDialog={props.showDialog}
            handleClose={props.handleClose}
            handleSubmit={props.handleSubmit}
            maxWidth='md'
        >
            <Grid container justify='center' direction='row' spacing={3}>
                <Grid item >
                    <TextField
                        autoFocus
                        margin="dense"
                        size="small"
                        variant="outlined"
                        id="inferior"
                        label="Inferior"
                        required={true}
                        value={props.input.name}
                        onChange={props.handleText}
                        helperText={props.errorState.name}
                        error={!!props.errorState.name}
                    />
                </Grid>
                <Grid item style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Typography component='p' color='textPrimary' >{'<'} X {'<'}</Typography>
                </Grid>
                <Grid item >
                    <TextField
                        margin="dense"
                        size="small"
                        variant="outlined"
                        id="superior"
                        label="Superior"
                        required={true}
                        value={props.input.name}
                        onChange={props.handleText}
                        helperText={props.errorState.name}
                        error={!!props.errorState.name}
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
);