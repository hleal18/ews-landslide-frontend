import React from 'react';
import ewsApi from '../Api/ewsApi';
import VariableConfigureForm from '../Presentational/Forms/VariableConfigureForm';

export default class VariableConfigureFormManager extends React.Component {
    constructor(props) {
        super(props);
        
        this.errorMessage = {
            empty: {
                upperBound: 'Nombre del punto crítico no debe estar vacío'
            }
        }
        
        this.state = {
            input: {
                upperBound: '',
                lowerBound: ''
            },
            errorState: {
                upperBound: undefined
            },
            isLoading: false,
            submitError: {
                message: undefined,
                showing: false
            }
        }
        
        
    }
    
    componentDidMount() {
        const { variables, variableId } = this.props;
        
        const variable = variables.find((variable) => variable._id === variableId);
        
        if (variable && variable.threshold) {
            const { threshold } = variable;
            
            if (threshold.upperBound) this.setState((prevState) => ({ 
                input: { 
                    ...prevState.input,
                    upperBound: threshold.upperBound 
                } 
            }));
            if (threshold.lowerBound) this.setState((prevState) => ({ 
                input: { 
                    ...prevState.input,
                    lowerBound: threshold.lowerBound
                } 
            }));
        }
    }
    
    componentDidUpdate() {
        // const { variables, variableId } = this.props;
        
        
        // const variable = variables.find((variable) => variable._id === variableId);
        // console.log('Variable existe: ', variable);
        // // This conditions are necessary to avoid infinite state updates.
        // if (variable && 
        //     variable.threshold &&
        //     variable.threshold.upperBound &&
        //     this.state.input.upperBound === '') {
        //     const { threshold } = variable;
            
        //     const upperBound = (threshold.upperBound) ? threshold.upperBound : '';
        //     this.setState((prevState) => ({...prevState, input: {
        //         ...prevState.input,
        //         upperBound
        //     }}));
            
        //     console.log('Variable superior con valor: ', variable);
        // } else if (!variable && 
        //     this.state.input.upperBound !== '') {
        //         this.setState((prevState) => ({...prevState, input: {
        //             ...prevState.input,
        //             upperBound: ''
        //         }}));
        //     console.log('Variable superior sin valor: ', variable);
        // }
        // if (variable && 
        //     variable.threshold &&
        //     variable.threshold.lowerBound &&            
        //     this.state.input.lowerBound === '') {
        //     const { threshold } = variable;
            
        //     const lowerBound = (threshold.lowerBound) ? threshold.lowerBound : '';
        //     this.setState((prevState) => ({...prevState, input: {
        //         ...prevState.input,
        //         lowerBound
        //     }}));
        //     console.log('Variable inferior con valor: ', variable);
        // } else if (!variable && 
        //     this.state.input.lowerBound !== '') {
        //         this.setState((prevState) => ({...prevState, input: {
        //             ...prevState.input,
        //             lowerBound: ''
        //         }}));
        //     console.log('Variable inferior sin valor: ', variable);
        // }
    }
    
    compon
    
    validateEmptyField = (field) => {
        if (typeof field !== 'string') throw new Error(`Field ${field} must be a string`);
        return field.length === 0 ? 'empty' : false;
    }
    
    validateFields = ({ upperBound, lowerBound, lat, lng }) => {
        const results = {
            upperBound: undefined,
            lowerBound: undefined
        }
        
        // let error = this.validateEmptyField(upperBound);
        
        // if (error) results.upperBound = this.errorMessage[error].upperBound;
        
        return results;
    }
    
    handleSubmit = async () => {
        const { input } = this.state;
        const { upperBound, lowerBound } = input;
        const { token, variables, variableId, sensorNode } = this.props;
        const validationResults = this.validateFields({ upperBound, lowerBound });
        
        this.setState({ errorState: {...validationResults} });
        
        console.log('VariableId: ', variableId);
        
        if (!validationResults.upperBound &&
            !validationResults.lowerBound) {
            
            const variable = variables.find((variable) => variable._id === variableId);

            this.setState({ isLoading: true });

            try {
                if (!variable.threshold) {
                    const threshold = await ewsApi.addThreshold(token, variableId, { upperBound, lowerBound });
                    this.setState({ input: { lowerBound: '', upperBound: '' } });
                    this.props.setThreshold(sensorNode, variable, threshold);
                } else {
                    // PUT
                    const upperBoundParam = upperBound === '' ? undefined : upperBound;
                    const lowerBoundParam = lowerBound === '' ? undefined : lowerBound;
                    
                    const threshold = await ewsApi.putThreshold(token, variable.threshold._id, {
                        upperBound: upperBoundParam,
                        lowerBound: lowerBoundParam
                    });
                    console.log('Putted threshold: ', threshold);
                    // igual con el siguiente -  lowerbound.
                    this.setState({ input: { lowerBound: '', upperBound: '' } });
                    this.props.setThreshold(sensorNode, variable, threshold);
                    
                }
                this.setState({ isLoading: false });
                console.log('Cerrando state');
                this.props.handleClose();
            } catch (e) {
                console.error(`Error while modifying or adding a new threshold ${e.message}`);
            }
            
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