import React from 'react';

import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Container from '@material-ui/core/Container';


import Paper from '@material-ui/core/Paper';
import LineChartStatic from './Presentational/Charts/LineChartStatic.js';
import LineChartDynamic from './Presentational/Charts/LineChartDynamic.js';
import AxisLineChartStatic from './Presentational/Charts/AxisLineChartStatic';
import AuthContext from './Contexts/AuthContext';
import ewsApi from './Api/ewsApi';

import PaperSheet from './PaperSheet';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
// }));

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
})

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            visData: [],
            entriesCount: 0,
            variablesConfig: [],
            variablesData: {},
            selectedDates: [],
        };
    }

    async componentDidMount() {
        this.setState({ selectedRiskZone: this.props.selectedRiskZone });
        await this.updateDeviceWithVariables();
        //console.log('Recorriendo: ');
        for (const varConf of this.state.variablesConfig) {
            await this.queryVariables(varConf);
        }
    }

    async componentDidUpdate() {

        if (this.state.selectedRiskZone !== this.props.selectedRiskZone) {
            this.setState({ selectedRiskZone: this.props.selectedRiskZone });
            await this.updateDeviceWithVariables();
            for (const varConf of this.state.variablesConfig) {
                await this.queryVariables(varConf);
            }
        }

    }

    async updateDeviceWithVariables() {
        //console.log('Vars: ');
        let devices = [];
        try {
            devices = await ewsApi.getSensorNodes(this.context.token);
            
            if (this.props.selectedRiskZone) {
                devices = this.props.selectedRiskZone.criticalSpots.reduce((prev, curr) => [...prev, ...curr.sensorNodes], []);
            }
        } catch(e) { console.log(`Error ${e.message}`); }
        
        
        //console.log('Vars2: ');
        const variablesConfig = [];

        for (const device of devices) {
            for (const variable of device.variables) {
                variablesConfig.push({
                    device: device._id,
                    deviceName: device.name,
                    variableId: variable.idSensor,
                    type: variable.type,
                });
            }
        }

        this.setState({ variablesConfig });
    }

    transformValuesToStaticChart(values) {
        const suitableValues = [];
        for (const value of values) {
            suitableValues.push({
                name: value.timestamp,
                measure: value.value,
            });
        }

        return suitableValues;
    }

    // Expects Array[{timestamp: Date, values: {x, y, z}}]
    // Produces: Array[{timestamp: Date, x, y, z}]
    transformValuesToAxisStaticChart(values) {
        const suitableValues = [];
        values.forEach(({ timestamp, value: { x, y, z } }) => {
            suitableValues.push({
                timestamp, x, y, z,
            });
        });

        return suitableValues;
    }


    async queryVariables(varConf) {
        const variablesData = [];
        
        //console.log('Varconf: ', varConf);
        let variables = [];
        try {
            variables = (await ewsApi.getVariables(varConf.device, { idSensor: varConf.variableId, type: varConf.type, limit: 400 }, this.context.token)).variables_records.variables;
        } catch (e) { console.log(`Error: ${e.message}`); }
        for (const variable of variables) {
            variablesData.push({
                timestamp: variable.timestamp,
                value: variable.value,
            });
        }

        variablesData.reverse();

        this.setState({
            variablesData: {
                ...this.state.variablesData,
                [varConf.device]: {
                    ...this.state.variablesData[varConf.device],
                    [varConf.variableId]: variablesData,
                },
            },
        });
    }

    handleDateChange(event) {
        console.log('Event: ', event);
        this.setState((state, props) => {
            const { date, start, index } = event;
            const { selectedDates } = state;
            selectedDates[index] = (start) ? {
                ...selectedDates[index],
                start: date,
            } : { ...selectedDates[index], end: date };

            console.log('Modified array: ', selectedDates);

            return { ...state, selectedDates };
        });
    }
    
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Container maxWidth={false}>
                    <Grid container spacing={3} direction="row" justify="center" alignItems="center" >
                        {
                            this.state.variablesConfig.map((variable, index) => {
                                // console.log('Evaluando: ', variable.device);
                                // console.log('Evaluando: ', variable.variableId);
                                const variableFromDevice = this.state.variablesData[variable.device];
                                const values = (variableFromDevice && variableFromDevice[variable.variableId])
                                    ? variableFromDevice[variable.variableId] : [];
                                const dateState = this.state.selectedDates[index];
                                if (values.length === 0) return ('');
                                return (
                                    <Grid item xs={12} sm={12} md={8} lg={6} xl={6} key={index}>
                                        <Paper>
                                            <Grid container direction="column" alignItems="center">
                                                <Grid item xs={12}>
                                                    <h3 className={classes.cardTitle}>
                                                        {variable.deviceName}
                                                        {' '}
                                                        -
                                                        {variable.type}
                                                        {' '}
                                                        ({variable.variableId})
                                                    </h3>
                                                </Grid>
                                                {
                                                    values.length > 0
                                                    && (
                                                        <div>
                                                            <Grid item   >
                                                                {
                                                                    (!['acceleration', 'rotationRate', 'inclination'].includes(variable.type))
                                                                        ? <LineChartStatic data={this.transformValuesToStaticChart(values)} />
                                                                        : <AxisLineChartStatic data={this.transformValuesToAxisStaticChart(values)} />
                                                                }
                                                            </Grid>
                                                            <Grid container spacing={3} direction="row" justify="center">
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <Grid item xs style={{ width: 'auto' }}>
                                                                        <KeyboardDatePicker
                                                                            margin="normal"
                                                                            id={`date-picker-dialog${index}${1}`}
                                                                            label="Fecha inicial"
                                                                            format="dd/MM/yyyy"
                                                                            value={(dateState && dateState.start) ? dateState.start : undefined}
                                                                            onChange={(date) => {
                                                                                this.handleDateChange({
                                                                                    date,
                                                                                    start: true,
                                                                                    index,
                                                                                });
                                                                            }}
                                                                            KeyboardButtonProps={{
                                                                                'aria-label': 'change date',
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs>
                                                                        <KeyboardDatePicker
                                                                            margin="normal"
                                                                            id={`date-picker-dialog${index}`}
                                                                            label="Fecha final"
                                                                            format="dd/MM/yyyy"
                                                                            value={(dateState && dateState.end) ? dateState.end : undefined}
                                                                            onChange={(date) => {
                                                                                this.handleDateChange({
                                                                                    date,
                                                                                    start: false,
                                                                                    index,
                                                                                });
                                                                            }}
                                                                            KeyboardButtonProps={{
                                                                                'aria-label': 'change date',
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                        </div>
                                                    )
                                                }
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </Container>
            </div>
        );
    }
}

Dashboard.contextType = AuthContext;
export default withStyles(styles)(Dashboard);
