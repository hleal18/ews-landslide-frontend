import React from 'react';
import CriticalPointCards from '../Presentational/Info/CriticalPointCards';
import DialogForm from '../Presentational/Forms/DialogForm';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Map from '../Presentational/Info/Map/Map';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class CriticalPointCardsManager extends React.Component {
    constructor(props) {
        super(props);
        
        this.errorMessage = {
            empty: {
                name: 'Nombre del punto crítico no debe estar vacío'
            }
        }
        
        this.state = {
            showAddForm: false,
            criticalPoints: [1, 2, 3, 4, 5, 6, 7, ],
            input: {
                name: '',
                description: '',
                lat: 0,
                lng: 0
            },
            errorState: {
                name: undefined
            },
            isLoading: false,
            submitError: {
                message: undefined,
                showing: false
            }
        }
    }
    
    handleAddButton = () => {
        this.setState((prevState) => ({
            showAddForm: !prevState.showAddForm
        }));
    }
    
    validateEmptyField = (field) => {
        if (typeof field !== 'string') throw new Error(`Field ${field} must be a string`);
        return field.length === 0 ? 'empty' : false;
    }
    
    validateFields = ({ name, description, lat, lng }) => {
        const results = {
            name: undefined,
            description: undefined,
            lat: undefined,
            lng: undefined
        }
        
        let error = this.validateEmptyField(name);
        
        if (error) results.name = this.errorMessage[error].name;
        
        return results;
    }
    
    handleSubmit = () => {
        const { input } = this.state;
        const { name, description, lat, lng } = input;
        
        const validationResults = this.validateFields({ name, description, lat, lng });
        
        this.setState({ errorState: {...validationResults} });
        
        if (!validationResults.name &&
            !validationResults.description &&
            !validationResults.lat &&
            !validationResults.lng) {
            
            this.setState({ isLoading: true });
        }
    }
    
    handleText = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        
        this.setState((prevState) => ({
            input: {
                ...prevState.input,
                [id]: value
            }
        }));
    }
    
    handleMapClick = (e) => {
        console.log('Map click: ', e);
        this.setState((prevState) => ({
            input: {
                ...prevState.input,
                lat: e.lat,
                lng: e.lng
            }
        }));
    }
    
    render() {
        return (
            <div>
                <CriticalPointCards
                    criticalPoints={this.state.criticalPoints}
                    handleOpenAddMenu={this.handleAddButton}
                />
                <DialogForm 
                    showDialog={this.state.showAddForm}
                    handleClose={this.handleAddButton}
                    handleSubmit={this.handleSubmit}
                    nameContent={this.state.input.name}
                    descriptionContent={this.state.input.description}
                    mapContent={{ 
                        lat:  this.state.input.lat,
                        lng: this.state.input.lng
                    }}
                    handleMapClick={this.handleMapClick}
                    handleText={this.handleText}
                >
                    <TextField
                        autoFocus
                        margin="dense"
                        variant="outlined"
                        id="name"
                        label="Nombre"
                        fullWidth
                        required={true}
                        value={this.state.input.name}
                        onChange={this.handleText}
                        helperText={this.state.errorState.name}
                        error={!!this.state.errorState.name}
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
                      value={this.state.input.description}
                      onChange={this.handleText}
                    />
                    <Typography component="p" color="textSecondary">
                        Seleccione ubicación de referencia
                    </Typography>
                    <Map 
                      position={{
                          lat: this.state.input.lat,
                          lng: this.state.input.lng
                      }}
                      handleClick={this.handleMapClick}
                    />
                    <p>
                        lat: {this.state.input.lat}   lng: {this.state.input.lng}
                    </p>
                    {
                        this.state.isLoading &&
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
        )
    }
}