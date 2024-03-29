import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import CriticalPointWatchMap from "./CriticalPointWatchMap";
import { variablesDefinitionAsObject } from "../../lib/variablesDefinition";


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

export default function CriticalPointCard({
  redirect,
  name,
  description,
  sensorNodes,
  handleOpenWatchMap,
  _id
}) {
  const classes = useStyles();
  const variablesMetadata = new Set();
  const variablesMetadataArr = [];
  // const [showMap, setShowMap] = useState(false);

  sensorNodes.forEach(({ variables }) =>
    variables.forEach(({ type }) => {
      // console.log("Variablesdefinition: ", variablesDefinitionAsObject[type]);
      // console.log("Setsize: ", variablesMetadata.size);
      // if (!variablesMetadata.has(variablesDefinitionAsObject[type])) {
      variablesMetadata.add(String(variablesDefinitionAsObject[type]));
      // variablesMetadataArr.push(variablesDefinitionAsObject[type]);
      // }
    })
  );

  variablesMetadata.forEach((varType) => variablesMetadataArr.push(varType));
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          Punto Crítico
        </Typography>
        <Typography variant="h5" component="h2" color="primary">
          {name}
        </Typography>
        <Grid container direction="column" className={classes.pos}>
          <Grid item>
            <Typography className={classes.pos} color="textSecondary">
              Numero de nodos: {sensorNodes?.length ?? 0}
            </Typography>
          </Grid>
          {variablesMetadataArr.length === 0 ? (
            <Grid item>
              <Typography className={classes.pos} color="textSecondary">
                No hay variables monitoreadas aun.
              </Typography>
            </Grid>
          ) : (
            <Grid container direction="row">
              <Grid item xs={3}>
                <Typography className={classes.pos} color="textSecondary">
                  Variables:
                </Typography>
              </Grid>
              <Grid container item xs spacing={1} direction="column">
                {/* <Grid item xs><Chip label="Humedad de suelo" size="small"  /></Grid>
                        <Grid item xs> <Chip label="Inclinación" size="small"  /></Grid>
                        <Grid item xs><Chip label="Inclinación" size="small"  /></Grid> */}
                {variablesMetadataArr.length !== 0 &&
                  variablesMetadataArr.map((varType, idx) => (
                    <Grid item xs key={idx}>
                      <Chip label={varType} size="small" />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          )}
        </Grid>

        <Typography variant="body2" component="p">
          {description ? description : <i>Sin descripción</i>}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container item spacing={1} justify="center" direction="row">
          <Button
            size="small"
            color="primary"
            onClick={redirect}
            className={classes.watch_node_button}
          >
            Ver Nodos
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={(e) => handleOpenWatchMap({ ...e, _id })}
          >
            Ver Mapa
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
