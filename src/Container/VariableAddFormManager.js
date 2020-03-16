import React from 'react';

import VariableAddForm from '../Presentational/Forms/VariableAddForm';

export default class VariableConfigureFormManager extends React.Component {
    constructor(props) {
        super(props);
        
        this.errorMessage = {
            empty: {
                description: 'Descripción de la variable no se recomienda dejarla vacía.',
                variable: 'Seleccione un tipo de variable.'
            }
        }
        
        this.state = {
            input: {
                variable: '',
                description: ''
            },
            errorState: {
                description: undefined,
                variable: undefined
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
    
    validateFields = ({ variable, description }) => {
        const results = {
            variable: undefined,
            description: undefined
        }
        
        let error = this.validateEmptyField(description);
        
        if (error) results.description = this.errorMessage[error].description;
        
        error = this.validateEmptyField(variable);
        
        if (error) results.variable = this.errorMessage[error].variable;
        
        return results;
    }
    
    handleSubmit = () => {
        const { input } = this.state;
        const { variable, description } = input;
        
        const validationResults = this.validateFields({ variable, description });
        
        this.setState({ errorState: {...validationResults} });
        
        if (!validationResults.variable &&
            !validationResults.description) {
            
            this.setState({ isLoading: true });
        }
        else {
            console.log('Solucione todos los errores');
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
    
    handleSelectChange = (e) => {
        console.log('Select: ', e)
        this.setState((prevState) => ({
            input: {
                ...prevState.input,
                variable:e.target.value
            }
        }));
    }
    
    render() {
        return (
            <div>
                <VariableAddForm 
                    {...this.props}
                    {...this.state}
                    {...this.errorMessage}
                    handleSubmit={this.handleSubmit}
                    handleText={this.handleText}
                    handleChange={this.handleSelectChange}
                />
            </div>
        );
    }
}