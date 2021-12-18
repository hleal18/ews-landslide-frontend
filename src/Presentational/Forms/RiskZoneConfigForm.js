import React from "react";

import DialogForm from "./DialogForm";
import Switch from '@material-ui/core/Switch';


import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { variablesDefinitionsAsObjectWithUnits } from "../../lib/variablesDefinition";

const RiskZoneConfigForm = (props) => {
    console.log("Riskzone a mostrar: ", props.riskZone);
    console.log("Notifications enabled props: ", props);
    return (
        <div>
            <DialogForm
                title={`Configuracion ${props.riskZone?.name}`}
                // contextText={`Activar Notificaciones`}
                showDialog={props.showDialog}
                handleClose={props.handleClose}
                handleSubmit={props.handleSubmit}
                maxWidth="sm"
            >
                <Grid
                    container
                    justify="center"
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >
                    <Grid item>Activar notificaciones</Grid>
                    <Grid item>
                        <Switch
                            checked={props.notificationsEnabled}
                            onChange={props.handleCheckBox}
                            color="primary"
                        >
                            Notifications
                        </Switch>
                    </Grid>
                </Grid>
                {props.isLoading && (
                    <Grid container justify="center" item>
                        <div>
                            <CircularProgress />
                        </div>
                    </Grid>
                )}
            </DialogForm>
        </div>
    );
};

export default RiskZoneConfigForm;
