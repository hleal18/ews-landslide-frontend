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
            const variablesNames = [];
            const variablesOptions = [];
            const selectedRiskZone = {...this.state.selectedRiskZone};
            const currentCriticalSpotId = selectedRiskZone.criticalSpots[0]._id;
            const currentSensorNode = this.getCurrentSensorNode(value, currentCriticalSpotId);
            
            console.log('CurrentSensorNode: ', currentSensorNode, 'for value: ', value);
            
            selectedRiskZone.criticalSpots[0].sensorNodes = [currentSensorNode];
            console.log('Selected riskZone: ', selectedRiskZone);
            
            variables.forEach((variable) => {
                variablesNames.push(variable.name);
                variablesOptions.push(variable._id);
            });

            this.setSelection('devices', value);
            this.enableAndSetOptions('variables', variablesNames, variablesOptions);
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
        // let currentSensorNode = undefined;
        // const currentCriticalSpot = this.getCurrentCriticalSpot(criticalSpotId);
        // console.log('CurrentCriticalSpot: ', currentCriticalSpot);
        // currentSensorNode = currentCriticalSpot.sensorNodes.find((sensorNode) => 
        //     sensorNode._id === sensorNodeId);
            
        // return currentSensorNode;
        console.log('RiskZones: ', this.props.riskZones);
        const currentRiskzone = this.props.riskZones.find((riskZone) =>
            riskZone._id === this.state.riskZones.value);
        console.log('CurrentRiskZone: ', currentRiskzone);
        const currentCriticalSpot = currentRiskzone.criticalSpots.find((criticalSpot) =>
            criticalSpot._id === this.state.criticalSpots.value);
        console.log('Current CriticalSpot: ', currentCriticalSpot);
        const currentSensorNode = currentCriticalSpot.sensorNodes.find((sensorNode) =>
            sensorNode._id === sensorNodeId);
        console.log('Current sensorNode: ', currentSensorNode);
        return currentSensorNode;        
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