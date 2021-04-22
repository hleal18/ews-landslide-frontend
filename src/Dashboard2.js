import React from "react";

import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";
import LineChartStatic from "./Presentational/Charts/LineChartStatic.js";
import AxisLineChartStatic from "./Presentational/Charts/AxisLineChartStatic";
import AuthContext from "./Contexts/AuthContext";
import ewsApi from "./Api/ewsApi";
import { variablesDefinitionAsObject } from "./lib/variablesDefinition";
import { FilterTiltShiftSharp } from "@material-ui/icons";
import moment from "moment";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      visData: [],
      entriesCount: 0,
      variablesConfig: [],
      variablesData: {},
      selectedDates: {},
      dateUpdate: undefined,
    };
  }

  async componentDidMount() {
    // console.log(
    //   "Component didmount selectedRiskzone: ",
    //   this.props.selectedRiskZone
    // );
    this.setState({ selectedRiskZone: this.props.selectedRiskZone });
    await this.updateDeviceWithVariables();
    //console.log('Recorriendo: ');
    for (const varConf of this.state.variablesConfig) {
      await this.queryVariables(varConf);
    }
  }

  async componentDidUpdate() {
    // console.log(
    //   "Component did update, selected riskzone from state: ",
    //   this.state.selectedRiskZone
    // );
    if (this.state.selectedRiskZone !== this.props.selectedRiskZone) {
      this.setState({ selectedRiskZone: this.props.selectedRiskZone });
      await this.updateDeviceWithVariables();
      for (const varConf of this.state.variablesConfig) {
        await this.queryVariables(varConf);
      }
    } else if (
      this.state.dateUpdate &&
      this.state.dateUpdate.deviceName &&
      this.state.dateUpdate.variableId
    ) {
      const curVarConf = this.state.variablesConfig.find(
        (vc) =>
          vc.deviceName === this.state.dateUpdate.deviceName &&
          vc.variableId === this.state.dateUpdate.variableId
      );
      await this.queryVariables(curVarConf);
      this.setState({ dateUpdate: undefined });
    }
  }

  async updateDeviceWithVariables() {
    //console.log('Vars: ');
    let devices = [];
    try {
      // devices = await ewsApi.getSensorNodes(this.context.token);

      if (this.props.selectedRiskZone) {
        devices = this.props.selectedRiskZone.criticalSpots.reduce(
          (prev, curr) => [...prev, ...curr.sensorNodes],
          []
        );
      }
      console.log("Devices to render", devices.length);
    } catch (e) {
      console.log(`Error ${e.message}`);
    }

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

    // console.log("variablesConfig:", variablesConfig);
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
        timestamp: timestamp,
        x,
        y,
        z,
      });
    });

    return suitableValues;
  }

  async queryVariables(varConf) {
    const variablesData = [];

    // console.log('Varconf: ', varConf);
    let variables = [];
    try {
      let startDate = moment().subtract(6, "months");
      let endDate;
      if (
        this.state.selectedDates[varConf.deviceName] &&
        this.state.selectedDates[varConf.deviceName][varConf.variableId]
      ) {
        const currentDate = this.state.selectedDates[varConf.deviceName][
          varConf.variableId
        ];
        if (currentDate.start)
          startDate = new Date(currentDate.start).toUTCString();
        if (currentDate.end) endDate = new Date(currentDate.end).toUTCString();
        // console.log("StartDate", startDate);
        // console.log("EndDate", endDate);
      }
      variables = (
        await ewsApi.getVariables(
          varConf.deviceName,
          {
            idSensor: varConf.variableId,
            type: varConf.type,
            limit: 10000,
            ...(startDate && { start: startDate }),
            ...(endDate && { end: endDate }),
          },
          this.context.token
        )
      ).variables_records.variables;
      // console.log('Variables found: ', variables);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
    for (const variable of variables) {
      variablesData.push({
        timestamp: new Date(variable.timestamp).toLocaleString(),
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
    // console.log("Event: ", event);
    this.setState((state, props) => {
      const { date, start, deviceName, variableId } = event;
      const { selectedDates } = state;

      if (!selectedDates[deviceName]) selectedDates[deviceName] = [];

      selectedDates[deviceName][variableId] = start
        ? {
            ...selectedDates[deviceName][variableId],
            start: moment(date).startOf("day"),
          }
        : {
            ...selectedDates[deviceName][variableId],
            end: moment(date).endOf("day"),
          };

      // console.log("Modified array: ", selectedDates);

      return {
        ...state,
        selectedDates,
        dateUpdate: { deviceName, variableId },
      };
    });
  }

  render() {
    const { classes } = this.props;
    // console.log("Dashboard selected riskzone: ", this.props.selectedRiskZone);
    // if (!this.props.selectedRiskZone.criticalSpots) console.log("Empty object");
    return (
      <div>
        {!this.props.selectedRiskZone.criticalSpots ? (
          <div className={classes.root}>
            <Container maxWidth={false}>
              <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item alignItems="centered">
                  <Typography
                    component="h1"
                    variant="h3"
                    style={{ color: "#A1A1A1" }}
                  >
                    Seleccione filtros para observar datos.
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </div>
        ) : this.state.variablesConfig.length === 0 ? (
          <div className={classes.root}>
            <Container maxWidth={false}>
              <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item alignItems="centered">
                  <Typography
                    component="h1"
                    variant="h3"
                    style={{ color: "#A1A1A1" }}
                  >
                    Aun no hay datos para mostrar
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </div>
        ) : (
          <div className={classes.root}>
            <Container maxWidth={false}>
              <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
              >
                {this.state.variablesConfig.map((variable, index) => {
                  // console.log('Evaluando: ', variable.device);
                  // console.log('Evaluando: ', variable.variableId);
                  const variableFromDevice = this.state.variablesData[
                    variable.device
                  ];
                  const values =
                    variableFromDevice &&
                    variableFromDevice[variable.variableId]
                      ? variableFromDevice[variable.variableId]
                      : [];
                  let dateState = {
                    start: values[0]
                      ? moment(new Date(values[0].timestamp)).startOf("day")
                      : moment().subtract(6, "months"),
                  };

                  // console.log("Default dateState:", dateState);
                  // console.log("Values[0]", values[0]);
                  if (
                    this.state.selectedDates[variable.deviceName] &&
                    this.state.selectedDates[variable.deviceName][
                      variable.variableId
                    ]
                  ) {
                    if (
                      this.state.selectedDates[variable.deviceName][
                        variable.variableId
                      ].start
                    ) {
                      dateState.start = this.state.selectedDates[
                        variable.deviceName
                      ][variable.variableId].start;
                    }
                    if (
                      this.state.selectedDates[variable.deviceName][
                        variable.variableId
                      ].end
                    ) {
                      dateState.end = this.state.selectedDates[
                        variable.deviceName
                      ][variable.variableId].end;
                    }
                  }
                  return (
                    <Grid item xs={12} sm={12} md={8} lg={6} xl={6} key={index}>
                      <Paper>
                        <Grid container direction="column" alignItems="center">
                          <Grid item xs={12}>
                            <h3 className={classes.cardTitle}>
                              {variable.deviceName} -{" "}
                              {variablesDefinitionAsObject[variable.type]}
                              {"-"}
                              {variable.variableId}
                            </h3>
                          </Grid>
                          {/* { values.length === 0 && <p>No hay valores</p> } */}
                          {values.length >= 0 && (
                            <div>
                              <Grid item>
                                {![
                                  "acceleration",
                                  "rotationRate",
                                  "inclination",
                                ].includes(variable.type) ? (
                                  <LineChartStatic
                                    data={this.transformValuesToStaticChart(
                                      values
                                    )}
                                  />
                                ) : (
                                  <AxisLineChartStatic
                                    data={this.transformValuesToAxisStaticChart(
                                      values
                                    )}
                                  />
                                )}
                              </Grid>
                              <Grid
                                container
                                spacing={3}
                                direction="row"
                                justify="center"
                              >
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <Grid item xs style={{ width: "auto" }}>
                                    <KeyboardDatePicker
                                      margin="normal"
                                      id={`date-picker-dialog${index}${1}`}
                                      label="Fecha inicial"
                                      format="dd/MM/yyyy"
                                      value={
                                        dateState && dateState.start
                                          ? dateState.start
                                          : moment().subtract(6, "months")
                                      }
                                      onChange={(date) => {
                                        this.handleDateChange({
                                          date,
                                          start: true,
                                          index,
                                          deviceName: variable.deviceName,
                                          variableId: variable.variableId,
                                        });
                                      }}
                                      KeyboardButtonProps={{
                                        "aria-label": "change date",
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <KeyboardDatePicker
                                      margin="normal"
                                      id={`date-picker-dialog${index}`}
                                      label="Fecha final"
                                      format="dd/MM/yyyy"
                                      value={
                                        dateState && dateState.end
                                          ? dateState.end
                                          : moment().endOf("day")
                                      }
                                      onChange={(date) => {
                                        this.handleDateChange({
                                          date,
                                          start: false,
                                          index,
                                          deviceName: variable.deviceName,
                                          variableId: variable.variableId,
                                        });
                                      }}
                                      KeyboardButtonProps={{
                                        "aria-label": "change date",
                                      }}
                                    />
                                  </Grid>
                                </MuiPickersUtilsProvider>
                              </Grid>
                            </div>
                          )}
                        </Grid>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

Dashboard.contextType = AuthContext;
export default withStyles(styles)(Dashboard);
