import React from 'react';
import DashboardFilterBar from '../Presentational/Forms/DashboardFiltersBar';

export default class DashboardFilters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            riskZones: {
                label: 'Zonas de Riesgo',
                id: 'riskZones',
                value: '',
                names: ['Todos'],
                options: [''],
                disabled: false
            },
            criticalSpots: {
                label: 'Puntos Críticos',
                id: 'criticalSpots',
                value: '',
                names: ['Todos'],
                options: [''],
                disabled: true
            },
            devices: {
                label: 'Dispositivos',
                id: 'devices',
                value: '',
                names: ['Todos'],
                options: [''],
                disabled: true
            },
            variables: {
                label: 'Variables',
                id: 'variables',
                value: '',
                names: ['Todos'],
                options: [''],
                disabled: true
            }
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        if (this.props.riskZones &&
            this.props.riskZones.length > 0 &&
            this.state.riskZones.names.length === 1) {
            const { riskZones } = this.props;
            const riskZonesNames = [];
            const riskZonesOptions = [];

            riskZones.forEach((riskZone) => {
                riskZonesNames.push(riskZone.name);
                riskZonesOptions.push(riskZone._id);
            });
            
            this.setState((prev) => ({
                riskZones: {
                    ...prev.riskZones,
                    names: ['Todos', ...riskZonesNames],
                    options: ['', ...riskZonesOptions]
                }
            }));
        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;

        if (id === 'riskZones' && value !== '') {
            const criticalSpots = this.findCriticalSpots(value);
            const criticalSpotsNames = criticalSpots.map((criticalSpot) => criticalSpot.name);
            const criticalSpotsOptions = criticalSpots.map((criticalSpot) => criticalSpot._id);
            
            this.setState((prev) => ({
                riskZones: {
                    ...prev.riskZones,
                    value  
                },
                criticalSpots: {
                    ...prev.criticalSpots,
                    value: '',
                    names: ['Todos', ...criticalSpotsNames],
                    options:['', ...criticalSpotsOptions],
                    disabled: false
                },
                devices: {
                    ...prev.devices,
                    value: '',
                    disabled: true
                },
                variables: {
                    ...prev.variables,
                    value: '',
                    disabled: true
                }
            }));
        } else if (id === 'criticalSpots' && value !== '') {
            const devices = this.findSensorNodes(value);

            const devicesNames = devices.map((device) => device.name);
            const devicesOptions = devices.map((device) => device._id);

            this.setState((prev) => ({
                criticalSpots: {
                    ...prev.criticalSpots,
                    value
                },
                devices: {
                    ...prev.devices,
                    value: '',
                    names: ['Todos', ...devicesNames],
                    options: ['', ...devicesOptions],
                    disabled: false
                },
                variables: {
                    ...prev.variables,
                    value: '',
                    disabled: true
                }
            }));
        } else if (id === 'devices' && value !== '') {
            const variables = this.findVariables(value);
            const variablesNames = [];
            const variablesOptions = [];

            variables.forEach((variable) => {
                variablesNames.push(variable.name);
                variablesOptions.push(variable._id);
            });

            this.setState((prev) => ({
                devices: {
                    ...prev.devices,
                    value
                },
                variables: {
                    ...prev.variables,
                    value: '',
                    names: ['Todos', ...variablesNames],
                    options: ['', ...variablesOptions],
                    disabled: false
                }
            }));
        } else if (id === 'riskZones') {
            this.setState((prev) => ({
                riskZones: {
                    ...prev.riskZones,
                    value  
                },
                criticalSpots: {
                    ...prev.criticalSpots,
                    value,
                    disabled: true
                },
                devices: {
                    ...prev.devices,
                    value,
                    disabled: true
                },
                variables: {
                    ...prev.variables,
                    value,
                    disabled: true
                }
            }));
        } else if (id === 'criticalSpots') {
            this.setState((prev) => ({
                criticalSpots: {
                    ...prev.criticalSpots,
                    value
                },
                devices: {
                    ...prev.devices,
                    value,
                    disabled: true
                },
                variables: {
                    ...prev.variables,
                    value,
                    disabled: true
                }
            }))
        } else if (id === 'devices') {
            this.setState((prev) => ({
                devices: {
                    ...prev.devices,
                    value
                },
                variables: {
                    ...prev.variables,
                    value,
                    disabled: true
                }
            }))
        } else {
            this.setState((prev) => ({
                [id]: {
                    ...prev[id],
                    value
                }
            }), () => console.log('Nuevo state: ', this.state));
        }
    }

    findCriticalSpots(riskZoneId) {
        const { riskZones } = this.props;
        const criticalSpots = [];

        riskZones.find((riskZone) => {
            if (riskZone._id !== riskZoneId) return false;
            
            riskZone.criticalSpots.forEach((criticalSpot) => 
                criticalSpots.push(criticalSpot));
            return true;
        });

        return criticalSpots;
    }

    findSensorNodes(criticalSpotId) {
        const { riskZones } = this.props;
        const sensorNodes = [];
        riskZones.find((riskZone) => {
            const criticalSpot = riskZone.criticalSpots.find((criticalSpot) => criticalSpot._id === criticalSpotId);
            if (!criticalSpot) return false;
            criticalSpot.sensorNodes.forEach((sensorNode) => sensorNodes.push(sensorNode));
            return true;
        });
        return sensorNodes;
    }

    findVariables(sensorNodeId) {
        const { riskZones } = this.props;
        const variables = [];

        riskZones.find((riskZone) => {
            const criticalSpot = riskZone.criticalSpots.find((criticalSpot) => {
                const sensorNode = criticalSpot.sensorNodes.find((sensorNode) => sensorNode._id === sensorNodeId);
                if (!sensorNode) return false;

                sensorNode.variables.forEach((variable) => variables.push(variable));
                return true;
            });
            
            if (!criticalSpot) return false;
            return true;
        });

        return variables;
    }

    render() {
        const { classes } = this.props;
        const { 
            state: {
                riskZones,
                criticalSpots, 
                devices, 
                variables
            } 
        } = this;
                

        console.log('Classes: ', classes);

        return (
            <div >
                <DashboardFilterBar
                    riskZones={{
                        id: riskZones.id,
                        label: riskZones.label,
                        names: riskZones.names,
                        value: riskZones.value,
                        options: riskZones.options,
                        disabled: riskZones.disabled
                    }}
                    criticalSpots={{
                        id: criticalSpots.id,
                        label: criticalSpots.label,
                        names: criticalSpots.names,
                        value: criticalSpots.value,
                        options: criticalSpots.options,
                        disabled: criticalSpots.disabled
                    }}

                    devices={{
                        id: devices.id,
                        label: devices.label,
                        names: devices.names,
                        value: devices.value,
                        options: devices.options,
                        disabled: devices.disabled
                    }}

                    variables={{
                        id: variables.id,
                        label: variables.label,
                        names: variables.names,
                        value: variables.value,
                        options: variables.options,
                        disabled: variables.disabled
                    }}

                    handleChange={this.handleChange}
                />
            </div>
        )
    }
}