import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CriticalPointCard from "./CriticalPointCard";
import BreadCrumbs from './BreadCrumbs';
import { withRouter } from 'react-router-dom';
import AddButton from '../AddButton'

const InfoComponent = (props) => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
        <CriticalPointCard {...props} redirect={() => props.history.push(props.route)}/>
    </Grid>
);

const CriticalPointCards = ({ criticalPoints, history, handleOpenAddMenu, riskZoneName, handleOpenWatchMap }) => {
    const { location: { pathname: currentLocation } } = history;
    console.log(`criticalPoints in cards: `, criticalPoints);
    return (
      <div>
        <Container maxWidth={false}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <BreadCrumbs
                routes={["riskzones"]}
                currentContent={riskZoneName}
                contents={["Zonas de riesgo"]}
              />
            </Grid>
            <Grid container spacing={3} direction="row" justify="flex-start">
              {criticalPoints.map((criticalPoint, ind) => (
                <InfoComponent
                  key={ind}
                  history={history}
                  {...criticalPoint}
                  route={`${currentLocation}/${criticalPoint._id}/sensornodes`}
                  handleOpenWatchMap={handleOpenWatchMap}
                />
              ))}
              <Grid
                container
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                alignItems="center"
                justify="center"
              >
                <AddButton handleClick={handleOpenAddMenu} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
}

export default withRouter(CriticalPointCards);
