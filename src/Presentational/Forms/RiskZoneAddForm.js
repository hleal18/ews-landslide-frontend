import React from 'react';

import DialogForm from './DialogForm';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

export default (props) => {
    return (<div>
        <DialogForm
            title={props.title}
            showDialog={props.showAddForm}
            handleClose={props.handleClose}
            handleSubmit={props.handleSubmit}
        >
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
            <TextField
                margin="dense"
                variant="outlined"
                id="description"
                label="Descripción"
                type="text"
                fullWidth
                multiline
                rows={6}
                value={props.input.description}
                onChange={props.handleText}
            />
            
            {
                props.isLoading &&
                <Grid container justify="center" spacing={2}>
                    <Grid item >
                        <div >
                            <CircularProgress />
                        </div>
                    </Grid>
                </Grid>
            }
        </DialogForm>
    </div>)
};