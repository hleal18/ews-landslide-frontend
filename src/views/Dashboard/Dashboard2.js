import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// charts
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { } from "react-vis";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import mqttClient from "../../mqtt/config";

class Dashboard2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }

        mqttClient.on('message', (topic, payload, packet) => {
            const newEntry = {
                name: new Date(Date.now()).toUTCString(), measure: Number(payload)
            }
            this.addMeasureEntry(newEntry);
        });
    }

    addMeasureEntry(entry) {
        //this.setState({ data: [...this.state.data, entry] }, (state) => console.log('New state: ', state));
        this.setState({ data: [...this.state.data, entry] }, (event) => {
            console.log('Event updated: ', this.state.data);
        });
    }

    render() {
        const { classes } = this.props;

        console.log('Classes: ', classes);
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        {
                            this.state.data.length !== 0 &&
                            <Card>
                                <ResponsiveContainer aspect={3} >
                                    <LineChart data={this.state.data} margin={{
                                        top: 30, right: 30, left: 20, bottom: 5,
                                    }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Line
                                            type="monotone"
                                            dataKey="measure"
                                            stroke="#82ca9d"
                                            activeDot={{ r: 8 }}
                                            isAnimationActive={false}
                                        />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>
                        }
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
