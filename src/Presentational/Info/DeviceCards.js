import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import DeviceCard from "./DeviceCard";
import BreadCrumbs from "./BreadCrumbs";
import AddButton from "../AddButton";
import { withRouter } from 'react-router-dom';

const InfoComponent = (props) => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
        <DeviceCard {...props} redirect={() => props.history.push(props.route)}/>
    </Grid>
);

const DeviceCards = ({ sensorNodes, handleOpenAddMenu, history }) => {
    const { location: { pathname: currentLocation } } = history;
    
    return    (<div>
        <Container maxWidth={false}>
            <Grid container spacing={3} direction="column">
                <Grid item >
                    <BreadCrumbs 
                        routes={['riskzones', 'criticalspots']} 
                        currentContent="Dispositivos"
                        contents={['Zonas de Riesgo', 'Puntos Críticos']}
                    />
                </Grid>
                <Grid container spacing={3} direction="row" justify="flex-start">
                    {
                        sensorNodes.map((sensorNode, ind) => <InfoComponent key={ind} {...sensorNode} history={history} route={`${currentLocation}/${sensorNode._id}/variables`}/>)
                    }
                    <Grid container item xs={12} sm={6} md={4} lg={3} xl={2} alignItems="center" justify="center">
                        <AddButton handleClick={handleOpenAddMenu}/>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </div>)
}

export default withRouter(DeviceCards);
