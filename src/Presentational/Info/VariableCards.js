import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import VariableCard from "./VariableCard";
import BreadCrumbs from "./BreadCrumbs";
import AddButton from "../AddButton";

const InfoComponent = () => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
        <VariableCard />
    </Grid>
);

export default ({ variables, handleOpenAddMenu }) => (
    <div>
        <Container maxWidth={false}>
            <Grid container spacing={3} direction="column">
                <Grid item >
                    <BreadCrumbs 
                        routes={['dashboard', 'critical_points', 'devices']} 
                        currentContent="Variables"
                        contents={['Dashboard', 'Puntos Críticos', 'Dispositivos']}
                    />
                </Grid>
                <Grid container spacing={3} direction="row" justify="flex-start">
                    {
                        variables.map((el, ind) => <InfoComponent key={ind} />)
                    }
                    <Grid container item xs={12} sm={6} md={4} lg={3} xl={2} alignItems="center" justify="center">
                        <AddButton handleClick={handleOpenAddMenu}/>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </div>
)
