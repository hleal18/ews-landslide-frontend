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
  chip: {
      marginBottom: 4
  },
  secondTitle: {
      marginBottom: 8
  }
});

export default function DeviceCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" >
          Nodo sensor
        </Typography>
        <Typography variant="h5" component="h2" className={classes.secondTitle}>
          t-beam-sf10
        </Typography>
            <Grid container spacing={0}  direction="column" className={classes.pos}>
                <Grid container direction="row">
                    <Grid item xs={3}>
                        <Typography className={classes.pos} color="textSecondary">
                            Umbrales:
                        </Typography>
                    </Grid>
                    <Grid container item xs spacing={1} className={classes.chip} direction="column">
                        <Grid item xs><Chip label="Humedad de suelo x1" size="small"  /></Grid>
                        <Grid item xs> <Chip label="Inclinación x2" size="small"  /></Grid>
                    </Grid>
                </Grid>
                <Grid container direction="row">
                    <Grid item xs={3} >
                        <Typography className={classes.pos} color="textSecondary">
                            Variables:
                        </Typography>
                    </Grid>
                    <Grid container item xs spacing={1} direction="column">
                        <Grid item xs><Chip label="Humedad de suelo" size="small"  /></Grid>
                        <Grid item xs> <Chip label="Inclinación" size="small"  /></Grid>
                    </Grid>
                </Grid>
            </Grid>
        <Typography variant="body2" component="p">
          Medición de variables ricolinas y sabrosas para el usuario final.
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={2}justify="center" direction="row">
            <Grid item><Button size="small" color="primary">Ver Variables</Button></Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
