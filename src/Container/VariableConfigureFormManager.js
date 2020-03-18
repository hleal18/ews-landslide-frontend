import React from 'react';

import VariableConfigureForm from '../Presentational/Forms/VariableConfigureForm';

export default class VariableConfigureFormManager extends React.Component {
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
                description: ''
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
            description: undefined
        }
        
        let error = this.validateEmptyField(name);
        
        if (error) results.name = this.errorMessage[error].name;
        
        return results;
    }
    
    handleSubmit = () => {
        const { input } = this.state;
        const { name, description } = input;
        
        const validationResults = this.validateFields({ name, description });
        
        this.setState({ errorState: {...validationResults} });
        
        if (!validationResults.name &&
            !validationResults.description) {
            
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
    
    render() {
        return (
            <div>
                <VariableConfigureForm 
                    {...this.props}
                    {...this.state}
                    {...this.errorMessage}
                    handleSubmit={this.handleSubmit}
                    handleText={this.handleText}
                />
            </div>
        );
    }
}