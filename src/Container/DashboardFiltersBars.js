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
            },
            selectedRiskZone: {
                
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
            const selectedRiskZone = {...this.props.riskZones.find((riskZone) => riskZone._id === value)};
            
            this.setSelection('riskZones', value);
            this.enableAndSetOptions('criticalSpots', criticalSpotsNames, criticalSpotsOptions);
            this.disableAndCleanSelect('devices');
            this.disableAndCleanSelect('variables');
            this.setSelectedRiskZone(selectedRiskZone);
        } else if (id === 'criticalSpots' && value !== '') {
            const devices = this.findSensorNodes(value);

            const devicesNames = devices.map((device) => device.name);
            const devicesOptions = devices.map((device) => device._id);
            const selectedRiskZone = {...this.state.selectedRiskZone};
            const currentCriticalSpot = this.getCurrentCriticalSpot(value);
            
            selectedRiskZone.criticalSpots = [
                currentCriticalSpot
            ];
            
            this.setSelection('criticalSpots', value);
            this.enableAndSetOptions('devices', devicesNames, devicesOptions);
            this.disableAndCleanSelect('variables');
            this.setSelectedRiskZone(selectedRiskZone);
        } else if (id === 'devices' && value !== '') {
            const variables = this.findVariables(value);
            const variablesNames = variables.map((variable) => variable.name);
            const variablesOptions = variables.map((variable) => variable._id);
            const selectedRiskZone = {...this.state.selectedRiskZone};
            const currentSensorNode = this.getCurrentSensorNode(value);
            
            selectedRiskZone.criticalSpots[0].sensorNodes = [currentSensorNode];

            this.setSelection('devices', value);
            this.enableAndSetOptions('variables', variablesNames, variablesOptions);
            this.setSelectedRiskZone(selectedRiskZone);
        } else if (id === 'variables' && value !== '') {
            const selectedRiskZone = {...this.state.selectedRiskZone};
            const currentVariable = this.getCurrentVariable(value);
            
            selectedRiskZone.criticalSpots[0].sensorNodes[0].variables = [currentVariable];
            
            this.setSelection('variables', value);
            this.setSelectedRiskZone(selectedRiskZone);
        } else if (id === 'riskZones') {            
            this.setSelection('riskZones', value);
            this.disableAndCleanSelect('criticalSpots')
            this.disableAndCleanSelect('devices')
            this.disableAndCleanSelect('variables')
        } else if (id === 'criticalSpots') {
            this.setSelection('criticalSpots', value);
            this.disableAndCleanSelect('devices')
            this.disableAndCleanSelect('variables')
        } else if (id === 'devices') {
            this.setSelection('devices', value);
            this.disableAndCleanSelect('variables')
        } else {
            this.setState((prev) => ({
                [id]: {
                    ...prev[id],
                    value
                }
            }));
        }
    }
    
    setSelection(attributeName, value) {
        this.setState((prev) => ({
            [attributeName]: {
                ...prev[attributeName],
                value
            }
        }));
    }
    
    setSelectedRiskZone(selectedRiskZone) {
        this.setState((prev) => ({
            selectedRiskZone
        }));
        
        this.props.setSelectedRiskZone(selectedRiskZone);
    }
    
    enableAndSetOptions(attributeName, attributeNames, attributeOptions) {
        this.setState((prev) => ({
            [attributeName]: {
                ...prev[attributeName],
                value: '',
                names: ['Todos', ...attributeNames],
                options: ['', ...attributeOptions],
                disabled: false
            }
        }));
    }
    
    disableAndCleanSelect(attributeName) {
        this.setState((prev) => ({
            [attributeName]: {
                ...prev[attributeName],
                value: '',
                disabled: true
            }
        }));
    }

    getCurrentCriticalSpot(criticalSpotId) {
        const currentRiskzone = this.props.riskZones.find((riskZone) => riskZone._id === this.state.riskZones.value);
        const currentCriticalSpot = currentRiskzone.criticalSpots.find((criticalSpot) => criticalSpot._id === criticalSpotId);
        return {...currentCriticalSpot};
    }
    
    getCurrentSensorNode(sensorNodeId) {
        const currentCriticalSpot = this.getCurrentCriticalSpot(this.state.criticalSpots.value);
        const currentSensorNode = currentCriticalSpot.sensorNodes.find((sensorNode) =>
            sensorNode._id === sensorNodeId);
        return {...currentSensorNode};        
    }
    
    getCurrentVariable(variableId) {
        const currentSensorNode = this.getCurrentSensorNode(this.state.devices.value);
        const currentVariable = currentSensorNode.variables.find((variable) => 
            variable._id === variableId);
        return {...currentVariable};
    }
    
    findCriticalSpots(riskZoneId) {
        const { riskZones } = this.props;
        const criticalSpots = [];

        riskZones.find((riskZone) => {
            if (riskZone._id !== riskZoneId) return false;
            
            riskZone.criticalSpots.forEach((criticalSpot) => 
                criticalSpots.push({...criticalSpot}));
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
            criticalSpot.sensorNodes.forEach((sensorNode) => sensorNodes.push({...sensorNode}));
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

                sensorNode.variables.forEach((variable) => variables.push({...variable}));
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