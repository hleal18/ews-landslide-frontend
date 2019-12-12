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

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import mqttClient from "../../mqtt/config";

class Dashboard2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            visData: [],
            entriesCount: 0
        }

        mqttClient.on('message', (topic, payload, packet) => {
            const payloadJson = JSON.parse(payload);
            const newEntry = {
                name: new Date(Date.now()).toUTCString(), measure: payloadJson.x
            }

            const newVisEntry = {
                x: this.state.entriesCount,
                y: payloadJson.y
            }
            this.setState({ entriesCount: this.state.entriesCount + 1 });
            this.addMeasureEntry(newEntry);
            this.addVisEntry(newVisEntry);
        });
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
                    <GridItem xs={12} sm={12} md={6}>
                        <Card>
                            <LineChartStatic data={this.state.data}></LineChartStatic>
                        </Card>
                        <Card>
                            <LineChartDynamic data={this.state.visData}></LineChartDynamic>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <Card>
                            <LineChartStatic data={this.state.data}></LineChartStatic>
                        </Card>
                        <Card>
                            <LineChartDynamic data={this.state.visData}></LineChartDynamic>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

Dashboard2.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard2);
