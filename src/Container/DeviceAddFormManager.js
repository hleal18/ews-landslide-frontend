import React from 'react';

import DeviceAddForm from '../Presentational/Forms/DeviceAddForm';
import ewsApi from '../Api/ewsApi';

export default class DeviceAddFormManager extends React.Component {
    constructor(props) {
        super(props);

        this.errorMessage = {
            empty: {
                name: 'Nombre del dispositivo no debe estar vacío',
                description: 'Descripción del nodo sensor no debe estar vacío'
            }
        }

        this.state = {
            input: {
                name: '',
                description: ''
            },
            errorState: {
                name: undefined,
                description: undefined
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

    validateFields = ({ name, description }) => {
        const results = {
            name: undefined,
            description: undefined
        }

        let error = this.validateEmptyField(name);

        if (error) results.name = this.errorMessage[error].name;

        error = this.validateEmptyField(description);

        if (error) results.description = this.errorMessage[error].description;

        return results;
    }

    handleSubmit = async () => {
        const { input } = this.state;
        const { name, description } = input;
        const { criticalSpotId, token } = this.props;

        const validationResults = this.validateFields({ name, description });

        this.setState({ errorState: { ...validationResults } });

        if (!validationResults.name &&
            !validationResults.description) {


            try {
                this.setState({ isLoading: true });
                const sensorNode = await ewsApi.addSensorNode(name, description, criticalSpotId, token);

                this.setState({
                    isLoading: false, 
                    input: {
                        name: '',
                        description: ''
                    }
                });
                
                this.props.setSensorNode(sensorNode);
                this.props.handleClose();
            } catch (e) {
                console.log(e.message);
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
                <DeviceAddForm
                    {...this.props}
                    {...this.state}
                    {...this.errorMessage}
                    handleSubmit={this.handleSubmit}
                    handleText={this.handleText}
                    title={`Agregar nuevo nodo sensor a ${this.props.criticalSpotName}`}
                />
            </div>
        );
    }
}