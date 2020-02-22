import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';

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
});

export default function InfoCard({ redirect }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" >
          Punto Crítico
        </Typography>
        <Typography variant="h5" component="h2">
          Salto del Cabron
        </Typography>
            <Grid container spacing={0}  direction="column" className={classes.pos}>
                <Grid item >
                    <Typography className={classes.pos} color="textSecondary">
                        Numero de nodos: 5 
                    </Typography>
                </Grid>
                <Grid container direction="row">
                    <Grid item xs={1}>
                        <Typography className={classes.pos} color="textSecondary">
                            Variables:
                        </Typography>
                    </Grid>
                    <Grid container item xs spacing={1} direction="column">
                        <Grid item xs><Chip label="Humedad de suelo" size="small"  /></Grid>
                        <Grid item xs> <Chip label="Inclinación" size="small"  /></Grid>
                        <Grid item xs><Chip label="Inclinación" size="small"  /></Grid>
                    </Grid>
                </Grid>
            </Grid>
        
        <Typography variant="body2" component="p">
          Consta de suelo árido, de arcilla. Se observan componentes rocosos.
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container item spacing={1}justify="center" direction="row">
            <Button size="small" color="primary" onClick={redirect}>Ver Nodos</Button>
            <Button size="small" color="primary">Ver Mapa de Referencia</Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
