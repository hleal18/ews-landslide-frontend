import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import InfoCard from "./InfoCard";

const renderInfoComponent = ({ind}) => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}  key={ind}>
        <InfoCard />
    </Grid>
);

export default ({ criticalPoints }) => (
    <div>
        <Container maxWidth={false}>
            <Grid container spacing={3} direction="row">
                {criticalPoints.map((el, ind) => (renderInfoComponent({ind})))}
            </Grid>
        </Container>
    </div>
)
