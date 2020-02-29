import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import DashboardFilterBar from '../Presentational/Forms/DashboardFilterBar';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: grey[100]
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
}));


class DashboardFilters extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state ={
            criticalPoints: {
                label: 'Puntos Críticos',
                id: 'criticalPoints',
                value: '',
                names: ['Cualquiera', 'Salto del Cabron', 'Faldas'],
                options: ['', 1, 2]
            },
            devices: {
                label: 'Dispositivos',
                id: 'devices',
                value: '',
                names: ['Cualquiera', 't-beam-sf10'],
                options: ['', 1]
            },
            variables: {
                label: 'Variables',
                id: 'variables',
                value: '',
                names: ['Cualquiera', 't-beam-sf10'],
                options: ['', 't-beam-sf10']
            }
        }
    }
    
    handleChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        
        console.log(`Cambiando id: ${id} y ${value}`);
        
        this.setState((prev) => ({
            [id]: {
                ...prev[id],
                value
            }
        }), () => console.log('Nuevo state: ', this.state));
    }
    
    render() {        
        const { classes } = this.props;
        
        console.log('Classes: ', classes);
        
        return (
            <div >
                <DashboardFilterBar 
                    criticalPoints={{
                        id: this.state.criticalPoints.id,
                        label: this.state.criticalPoints.label,
                        names: this.state.criticalPoints.names,
                        value: this.state.criticalPoints.value,
                        options: this.state.criticalPoints.options
                    }}
                    
                    devices={{
                        id: this.state.devices.id,
                        label: this.state.devices.label,
                        names: this.state.devices.names,
                        value: this.state.devices.value,
                        options: this.state.devices.options
                    }}
                    
                    variables={{
                        id: this.state.variables.id,
                        label: this.state.variables.label,
                        names: this.state.variables.names,
                        value: this.state.variables.value,
                        options: this.state.variables.options
                    }}
                    
                    handleChange={this.handleChange}
                />
            </div>
        )
    }
}

export default withStyles(useStyles)(DashboardFilters);