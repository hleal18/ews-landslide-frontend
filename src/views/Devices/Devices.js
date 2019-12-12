import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
// charts
//import { XYPlot, VerticalGridLines, HorizontalGridLines, LineSeries, XAxis, YAxis } from "react-vis";
import LineChartStatic from "components/Charts/LineChartStatic.js";
import LineChartDynamic from "components/Charts/LineChartDynamic.js";
// Without styles, the chart is not going to show correctly.
import '../../../node_modules/react-vis/dist/style.css';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";

// import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import mqttClient from "../../mqtt/config";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CustomInput from "components/CustomInput/CustomInput";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

class Devices extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            criticalSpot: '',
            variables: []
        }
    }

    handleChange = (event) => {
        this.setState({ ...this.state, criticalSpot: event.target.value });
    }

    handleMultipleChange = (event) => {
        this.setState({ ...this.state, variables: event.target.value });
    }

    render() {
        const { classes } = this.props;
        const variables = [
            'Humedad de suelo',
            'Nivel de lluvia'
        ];
        console.log('Classes: ', classes);
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Dispositivos</h4>
                                <p className={classes.cardCategoryWhite}>Agregar nuevo</p>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem>
                                        <CustomInput
                                            labelText="Nombre de dispositivo"
                                            id="device-name"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem>
                                        <CustomInput
                                            labelText="Descripcion"
                                            id="device-description"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem>
                                        <CustomInput
                                            labelText="Variables"
                                            id="device-variables"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem>
                                        <FormControl>
                                            <InputLabel id="critical-spot-label" >Variables</InputLabel>
                                            <Select
                                                labelid="critical-spot-label"
                                                id="critical-spot-select"
                                                multiple
                                                value={this.state.variables}
                                                onChange={this.handleMultipleChange}
                                                input={<Input id="select-multiple-id" />}
                                                renderValue={selected => (
                                                    <div >
                                                        {selected.map(value => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </div>
                                                )}
                                            >
                                                {
                                                    variables.map(variable => (
                                                        <MenuItem key={variable} value={variable}>
                                                            {variable}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem>
                                        <InputLabel id="demo-example">
                                            Punto Crítico
                                        </InputLabel>
                                        <Select
                                            labelid="demo-example"
                                            id="demo-example-select"
                                            value={this.state.criticalSpot}
                                            onChange={this.handleChange}
                                        >
                                            <MenuItem value={10}>Hola</MenuItem>
                                            <MenuItem value={10}>Adios</MenuItem>
                                            <MenuItem value={10}>Buenitas</MenuItem>
                                        </Select>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>

                        </Card>
                    </GridItem>
                </GridContainer>
            </div >
        );
    }
}

Devices.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Devices);
