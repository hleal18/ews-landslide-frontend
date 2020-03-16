import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CriticalPointCard from "./CriticalPointCard";
import BreadCrumbs from './BreadCrumbs';
import { withRouter } from 'react-router-dom';
import AddButton from '../AddButton'

const InfoComponent = ({ history }) => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
        <CriticalPointCard redirect={() => history.push('/devices')}/>
    </Grid>
);

const CriticalPointCards = ({ criticalPoints, history, handleOpenAddMenu }) => (
    <div>
        <Container maxWidth={false}>
            <Grid container spacing={3} direction="column" >
                <Grid item > 
                    <BreadCrumbs 
                        routes={['dashboard']}
                        currentContent="Puntos Críticos"
                        contents={['Dashboard']}
                    />
                </Grid>
                <Grid container  spacing={3} direction="row" justify="flex-start">
                    {
                        criticalPoints.map((el, ind) => 
                            <InfoComponent key={ind} history={history} />)
                    }
                    <Grid container item xs={12} sm={6} md={4} lg={3} xl={2} alignItems="center" justify="center">
                        <AddButton handleClick={handleOpenAddMenu}/>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </div>
)

export default withRouter(CriticalPointCards);
