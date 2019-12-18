import React from "react";

import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';


import LineChartStatic from "./Charts/LineChartStatic.js";
import LineChartDynamic from "./Charts/LineChartDynamic.js";
import AxisLineChartStatic from "./Charts/AxisLineChartStatic";
import ewsApi from "./Api/ewsApi";

import PaperSheet from "./PaperSheet";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

// const styles = {
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     }
// }

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            visData: [],
            entriesCount: 0,
            variablesConfig: [],
            variablesData: {},
            selectedDates: []
        }
    }

    async componentDidMount() {
        console.log('Actualuzando: ');
        await this.updateDeviceWithVariables();
        console.log('Recorriendo: ');
        for (const varConf of this.state.variablesConfig) {
            await this.queryVariables(varConf);
        }

    }

    async updateDeviceWithVariables() {
        console.log('Vars: ');
        const devices = (await ewsApi.getDevices()).devices;
        console.log('Vars2: ');
        const variablesConfig = [];

        for (const device of devices) {
            for (const variable of device.variables) {
                variablesConfig.push({
                    device: device.name,
                    variableId: variable.idSensor,
                    type: variable.type
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
                measure: value.value
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
                timestamp, x, y, z
            });
        });

        return suitableValues;
    }



    async queryVariables(varConf) {
        const variablesData = [];

        const variables = (await ewsApi.getVariables(varConf.device, { type: varConf.type, limit: 100 })).variables_records.variables;

        for (const variable of variables) {
            variablesData.push({
                timestamp: variable.timestamp,
                value: variable.value
            });
        }

        variablesData.reverse();

        this.setState({
            variablesData: {
                [varConf.device]: {
                    ...this.state.variablesData[varConf.device],
                    [varConf.variableId]: variablesData
                }
            }
        });
    }

    handleDateChange(event) {
        console.log('Event: ', event);
        this.setState((state, props) => {
            const { date, start, index } = event;
            const selectedDates = state.selectedDates;
            selectedDates[index] = (start) ? {
                ...selectedDates[index],
                start: date
            } : { ...selectedDates[index], end: date }

            console.log('Modified array: ', selectedDates);

            return { ...state, selectedDates };
        });
    }

    componentDidUpdate() {
        console.log('Nuevo estado: ', this.state);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
                    {
                        this.state.variablesConfig.map((variable, index) => {
                            console.log('Evaluando: ', variable.device);
                            console.log('Evaluando: ', variable.variableId);
                            const variableFromDevice = this.state.variablesData[variable.device];
                            const values = (variableFromDevice && variableFromDevice[variable.variableId]) ?
                                variableFromDevice[variable.variableId] : [];
                            const dateState = this.state.selectedDates[index];
                            if (values.length === 0) return;
                            return (
                                <Grid item xs={6} key={index} >
                                    <Paper>
                                        <Grid container direction='column' alignItems='center'>
                                            <Grid item xs={6}>
                                                <h3 className={classes.cardTitle}>
                                                    {variable.device} - {variable.type} ({variable.variableId})
                                                </h3>
                                            </Grid>

                                            {
                                                values.length > 0 &&
                                                <div>

                                                    <Grid item xs={6} >
                                                        {
                                                            (!['acceleration', 'rotationRate'].includes(variable.type)) ?
                                                                <LineChartStatic data={this.transformValuesToStaticChart(values)}></LineChartStatic>
                                                                : <AxisLineChartStatic data={this.transformValuesToAxisStaticChart(values)}></AxisLineChartStatic>
                                                        }
                                                    </Grid>
                                                    <Grid container spacing={3} direction='row' alignItems='center'>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <Grid item xs={6}>
                                                                <KeyboardDatePicker
                                                                    margin="normal"
                                                                    id="date-picker-dialog"
                                                                    label="Fecha inicial"
                                                                    format="dd/MM/yyyy"
                                                                    value={(dateState && dateState.start) ? dateState.start : undefined}
                                                                    onChange={(date) => {
                                                                        this.handleDateChange({
                                                                            date,
                                                                            start: true,
                                                                            index
                                                                        });
                                                                    }}
                                                                    KeyboardButtonProps={{
                                                                        'aria-label': 'change date',
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <KeyboardDatePicker
                                                                    margin="normal"
                                                                    id="date-picker-dialog"
                                                                    label="Fecha final"
                                                                    format="dd/MM/yyyy"
                                                                    value={(dateState && dateState.end) ? dateState.end : undefined}
                                                                    onChange={(date) => {
                                                                        this.handleDateChange({
                                                                            date,
                                                                            start: false,
                                                                            index
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
                                            }
                                        </Grid>
                                    </Paper>
                                </Grid>);
                        })
                    }
                </Grid>
            </div>
        )
    }
}

export default withStyles(useStyles)(Dashboard);