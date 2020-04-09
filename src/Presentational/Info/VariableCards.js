import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import VariableCard from "./VariableCard";
import BreadCrumbs from "./BreadCrumbs";
import AddButton from "../AddButton";
import { withRouter } from 'react-router-dom';

const InfoComponent = (props) => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
        <VariableCard  {...props} handleOpenConfigureMenu={props.handleOpenConfigureMenu} />
    </Grid>
);

const getCriticalSpotRoute = (path) => (
    path
    .split('/')
    .slice(0, 4)
    .join('/')
    .slice(1)
);

const getSensorNodeRoute = (path) => (
    path
    .split('/')
    .slice(0, 6)
    .join('/')
    .slice(1)
);

const VariableCards = ({ 
    variables, 
    history, 
    handleOpenAddMenu, 
    handleOpenConfigureMenu,
    riskZoneName,
    criticalSpotName,
    sensorNodeName
}) => {
    const { location: { pathname: currentPath } } = history;
    const criticalSpotRoute = getCriticalSpotRoute(currentPath);
    const sensorNodeRoute = getSensorNodeRoute(currentPath);
    
    return (<div>
        <Container maxWidth={false}>
            <Grid container spacing={3} direction="column">
                <Grid item >
                    <BreadCrumbs 
                        routes={['riskzones', criticalSpotRoute, sensorNodeRoute]} 
                        currentContent={sensorNodeName}
                        contents={['Zonas de riesgo', riskZoneName, criticalSpotName]}
                    />
                </Grid>
                <Grid container spacing={3} direction="row" justify="flex-start">
                    {
                        variables.map((variable, ind) => <InfoComponent key={ind} handleOpenConfigureMenu={handleOpenConfigureMenu} {...variable}/>)
                    }
                    <Grid container item xs={12} sm={6} md={4} lg={3} xl={2} alignItems="center" justify="center">
                        <AddButton handleClick={handleOpenAddMenu}/>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </div>)
}

export default withRouter(VariableCards);