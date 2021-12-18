import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
        fontSize: 12,
    },
    watch_node_button: {
        marginRight: 25,
    },
});

export default function RiskZoneCard({ config, redirect, name, description, notificationsEnabled = false }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary">
                    Zona de riesgo
                </Typography>
                <Typography
                    variant="h5"
                    component="h2"
                    color="primary"
                    style={{ marginBottom: 6 }}
                >
                    {name}
                </Typography>
                <Typography
                    variant="body2"
                    component="p"
                    style={{ marginBottom: 6 }}
                >
                    {description ? (
                        description
                    ) : (
                        <i>Sin descripción especificada</i>
                    )}
                </Typography>
                <Typography variant="body2" component="p">
                    Notificaciones:{" "}
                    <b>
                        <i>
                            {notificationsEnabled
                                ? "Activadas"
                                : "Desactivadas"}
                        </i>
                    </b>
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container justify="center" direction="row">
                    <Grid item spacing={1} justify="center" direction="column">
                        <Button
                            size="small"
                            color="primary"
                            onClick={redirect}
                            className={classes.watch_node_button}
                        >
                            Ver Puntos Críticos
                        </Button>
                    </Grid>
                    <Grid item spacing={1} justify="center" direction="column">
                        <Button
                            size="small"
                            color="primary"
                            onClick={config}
                            className={classes.watch_node_button}
                        >
                            Notificaciones
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
