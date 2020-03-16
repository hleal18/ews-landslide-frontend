import React from 'react';

import CriticalPointsAddForm from '../Presentational/Forms/CriticalPointAddForm';

export default class CriticalPointCardsAddFormManager extends React.Component {
    constructor(props) {
        super(props);
        
        this.errorMessage = {
            empty: {
                name: 'Nombre del punto crítico no debe estar vacío'
            }
        }
        
        this.state = {
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
                <CriticalPointsAddForm 
                    {...this.props}
                    {...this.state}
                    {...this.errorMessage}
                    handleSubmit={this.handleSubmit}
                    handleText={this.handleText}
                    handleMapClick={this.handleMapClick}
                />
            </div>
        );
    }
}