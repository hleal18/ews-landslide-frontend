import React from 'react';

import DialogForm from './DialogForm';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Map from '../Info/Map/Map';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

export default (props) => (
    <div>
        <DialogForm
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
                autoFocus
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
            <Typography component="p" color="textSecondary">
                Seleccione ubicación de referencia
                    </Typography>
            <Map
                position={{
                    lat: props.input.lat,
                    lng: props.input.lng
                }}
                handleClick={props.handleMapClick}
            />
            <p>
                lat: {props.input.lat}   lng: {props.input.lng}
            </p>
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
    </div>
);