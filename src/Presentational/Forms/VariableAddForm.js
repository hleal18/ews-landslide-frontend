import React from 'react';

import DialogForm from './DialogForm';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import Select from '../Forms/SelectForm';
import { variablesDefinitionAsArrays } from '../../lib/variablesDefinition';

export default (props) => (
    <div>
        <DialogForm
            title={props.title}
            showDialog={props.showAddForm}
            handleClose={props.handleClose}
            handleSubmit={props.handleSubmit}
        >
            <Grid container justify='center' direction='column' spacing={3}>
                <Grid item >
                    <Select
                        handleChange={props.handleChange}
                        id='select-variable-type'
                        label='Variables'
                        names={[...variablesDefinitionAsArrays.names]}
                        options={[...variablesDefinitionAsArrays.values]}
                        fullWidth={true}
                        value={props.input.variable}
                        error={!!props.errorState.variable}
                    />
                    {
                        !!props.errorState.variable &&
                        <Grid container justify='flex-start' item >
                            <Typography component='p' color='error'>
                                {props.errorState.variable}
                            </Typography>
                        </Grid>
                    }
                </Grid>
                <Grid item >
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
                        required={true}
                        helperText={props.errorState.description}
                        error={!!props.errorState.description}
                    />
                </Grid>
                <Grid item >
                    <Typography component="p" color="textSecondary">
                        Posteriormente podrá configurar los umbrales para esta variable
                </Typography>
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