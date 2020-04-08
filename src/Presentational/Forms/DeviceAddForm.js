import React from 'react';

import DialogForm from './DialogForm';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

export default (props) => (
    <div>
        <DialogForm
            showDialog={props.showAddForm}
            handleClose={props.handleClose}
            handleSubmit={props.handleSubmit}
        >
            <Grid container justify='center' direction='column' spacing={3}>
                <Grid item >
                    <TextField
                        autoFocus
                        margin="dense"
                        variant="outlined"
                        id="name"
                        label="Nombre"
                        fullWidth
                        required={true}
                        value={props.input.name}
                        onChange={props.handleText}
                        helperText={props.errorState.name}
                        error={!!props.errorState.name}
                    />
                </Grid>
                <Grid item >
                    <TextField
                        margin="dense"
                        variant="outlined"
                        id="description"
                        label="Descripción"
                        type="text"
                        fullWidth
                        required={true}
                        multiline
                        rows={6}
                        value={props.input.description}
                        onChange={props.handleText}
                        helperText={props.errorState.description}
                        error={!!props.errorState.description}
                    />
                </Grid>
                <Grid item >
                </Grid>
                {
                    props.isLoading &&

                    <Grid container justify='center' item >
                        <div >
                            <CircularProgress />
                        </div>
                    </Grid>

                }
            </Grid>
        </DialogForm>
    </div>
);