import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import RiskZoneCard from "./RiskZoneCard";
import BreadCrumbs from './BreadCrumbs';
import { withRouter } from 'react-router-dom';
import AddButton from '../AddButton'

const InfoComponent = (props) => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
        <RiskZoneCard {...props} redirect={() => props.history.push('/critical_points')} />
    </Grid>
);

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 48
    }
}));

const RiskZoneCards = ({ riskZones, history, handleOpenAddMenu }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container maxWidth={false}>
                <Grid container spacing={3} direction="column" >
                    <Grid container spacing={3} direction="row" justify="flex-start">
                        {
                            riskZones.map((riskZone, ind) =>
                                <InfoComponent key={ind} history={history} {...riskZone} />)
                        }
                        <Grid container item xs={12} sm={6} md={4} lg={3} xl={2} alignItems="center" justify="center">
                            <AddButton handleClick={handleOpenAddMenu} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default withRouter(RiskZoneCards);
