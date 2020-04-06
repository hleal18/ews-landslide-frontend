import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
        fontSize: 12
    },
    watch_node_button: {
        marginRight: 25
    }
});

export default function RiskZoneCard({ redirect, name, description }) {
    const classes = useStyles();
    console.log(`Name received: ${name}`);
    console.log(`Description received: ${description}`);
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" >
                    Zona de riesgo
                </Typography>
                <Typography variant="h5" component="h2" color='primary'>
                    {name}
                </Typography>
                <Typography variant="body2" component="p">
                    {description ? description : <i>Sin descripción especificada</i>}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container item spacing={1} justify="center" direction="row">
                    <Button size="small" color="primary" onClick={redirect} className={classes.watch_node_button}>Ver Puntos Críticos</Button>
                </Grid>
            </CardActions>
        </Card>
    );
}
