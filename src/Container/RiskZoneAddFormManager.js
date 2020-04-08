import React from 'react';

import RiskZoneAddForm from '../Presentational/Forms/RiskZoneAddForm';
import ewsApi from '../Api/ewsApi';

export default class RiskZoneAddFormManager extends React.Component {
    constructor(props) {
        super(props);

        this.errorMessage = {
            empty: {
                name: 'Nombre de la zona de riesgo no debe estar vacía'
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

    validateFields = ({ name, description }) => {
        const results = {
            name: undefined,
            description: undefined
        }

        let error = this.validateEmptyField(name);

        if (error) results.name = this.errorMessage[error].name;

        return results;
    }

    handleSubmit = async () => {
        const { input } = this.state;
        const { name, description } = input;

        const validationResults = this.validateFields({ name, description });

        this.setState({ errorState: { ...validationResults } });

        if (!validationResults.name &&
            !validationResults.description) {
            
            try {
                this.setState({ isLoading: true });
                const riskZone = await ewsApi.addRiskZone(name, description, this.props.token);
                this.setState({ isLoading: false, input: { name: '', description: '' } });
                this.props.setRiskZones((prevState) => ([...prevState, {
                    ...riskZone,
                    // Every riskZone should contain an array of criticalSpots.
                    // The natural structure of a riskZone from the api does not
                    // contain criticalSpots. But in the client app, it is required
                    // in order for it to behave properly. In consequence,
                    // criticalSpots is initialized as an empty array.
                    criticalSpots: []
                }]));
                this.props.handleClose();
            } catch(e) {
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
                <RiskZoneAddForm
                    {...this.props}
                    {...this.state}
                    {...this.errorMessage}
                    handleSubmit={this.handleSubmit}
                    handleText={this.handleText}
                    title={"Agregar nueva Zona de Riesgo"}
                />
            </div>
        );
    }
}