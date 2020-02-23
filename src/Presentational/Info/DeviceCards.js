import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import DeviceCard from "./DeviceCard";
import BreadCrumbs from "./BreadCrumbs";
import AddButton from "../AddButton";

const renderInfoComponent = ({ind}) => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}  key={ind}>
        <DeviceCard />
    </Grid>
);

export default ({ devices }) => (
    <div>
        <Container maxWidth={false}>
            <Grid container spacing={3} direction="row">
                <Grid container direction="row">
                    <Grid item xs={12} ><BreadCrumbs /></Grid>                    
                </Grid>                
                <Grid container spacing={3} direction="row" justify="flex-start">
                    {devices.map((el, ind) => (renderInfoComponent({ind})))}
                    <Grid container item xs={12} sm={6} md={4} lg={3} xl={2} alignItems="center" justify="center">
                        <AddButton />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </div>
)
