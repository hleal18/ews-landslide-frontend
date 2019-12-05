import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import { withStyles } from "@material-ui/core/styles";
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
    }

    addMeasureEntry(entry) {
        this.setState({ data: [...this.state.data, entry] }, (state) => console.log('New state: ', state));
    }

    addVisEntry(entry) {
        this.setState({ visData: [...this.state.visData, entry] }, (state) => console.log('New state: ', this.state.visData));
    }

    render() {
        const { classes } = this.props;

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
                                            formControlprops={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: true
                                            }}
                                        />
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
