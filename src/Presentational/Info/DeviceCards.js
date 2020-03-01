import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import DeviceCard from "./DeviceCard";
import BreadCrumbs from "./BreadCrumbs";
import AddButton from "../AddButton";

const InfoComponent = () => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
        <DeviceCard />
    </Grid>
);

export default ({ devices }) => (
    <div>
        <Container maxWidth={false}>
            <Grid container spacing={3} direction="column">
                <Grid item >
                    <BreadCrumbs 
                        routes={['dashboard', 'critical_points']} 
                        currentContent="Dispositivos"
                        contents={['Dashboard', 'Puntos Críticos']}
                    />
                </Grid>
                <Grid container spacing={3} direction="row" justify="flex-start">
                    {
                        devices.map((el, ind) => <InfoComponent key={ind} />)
                    }
                    <Grid container item xs={12} sm={6} md={4} lg={3} xl={2} alignItems="center" justify="center">
                        <AddButton handleClick={(e) => console.log('Button Pressed')}/>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </div>
)
