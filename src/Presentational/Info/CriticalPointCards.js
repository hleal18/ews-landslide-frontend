import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CriticalPointCard from "./CriticalPointCard";
import { withRouter } from 'react-router-dom';

const renderInfoComponent = ({ind, history}) => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={ind}>
        <CriticalPointCard redirect={() => history.push('/devices')}/>
    </Grid>
);

const CriticalPointCards = ({ criticalPoints, history }) => (
    <div>
        <Container maxWidth={false}>
            <Grid container  spacing={3} direction="row" justify="center">
                {criticalPoints.map((el, ind) => (renderInfoComponent({ind, history})))}
            </Grid>
        </Container>
    </div>
)

export default withRouter(CriticalPointCards);
