import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
  chip: {
    marginBottom: 4,
  },
  secondTitle: {
    marginBottom: 8,
  },
});

export default function DeviceCard({ name, description, redirect, variables }) {
  const classes = useStyles();
  const variablesMetadata = new Set(
    variables.map((variable) => variablesDefinitionAsObject[variable.type])
  );

  const variablesMetadataArr = [];

  variablesMetadata.forEach((varType) => variablesMetadataArr.push(varType));
  console.log("variablesmetadatasize", variablesMetadata.size);

  const thresholdsMetadata = new Set(
    variables
      .filter((variable) => variable.threshold !== undefined)
      .map((variable) => variablesDefinitionAsObject[variable.type])
  );

  const thresholdsMetadataArr = [];

  console.log("variables:", variables);

  thresholdsMetadata.forEach((varType) => thresholdsMetadataArr.push(varType));
  console.log("Sizethesholdsmetadataset", thresholdsMetadata.size);

  console.log("araray", thresholdsMetadataArr);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          Nodo sensor
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          className={classes.secondTitle}
          color="primary"
        >
          {name}
        </Typography>
        <Grid container spacing={0} direction="column" className={classes.pos}>
          {thresholdsMetadataArr.length === 0 ? (
            <Grid item>
              <Typography className={classes.pos} color="textSecondary">
                No hay umbrales configurados aun.
              </Typography>
            </Grid>
          ) : (
            <Grid container direction="row">
              <Grid item xs={3}>
                <Typography className={classes.pos} color="textSecondary">
                  Umbrales:
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs
                spacing={1}
                className={classes.chip}
                direction="column"
              >
                {thresholdsMetadataArr.map((varType) => (
                  <Grid item xs>
                    <Chip label={varType} size="small" />
                  </Grid>
                ))}
                {/* <Grid item xs>
                  <Chip label="Humedad de suelo x1" size="small" />
                </Grid>
                <Grid item xs>
                  {" "}
                  <Chip label="Inclinación x2" size="small" />
                </Grid> */}
              </Grid>
            </Grid>
          )}
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
                {variablesMetadataArr.map((varType) => (
                  <Grid item xs>
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
        <Grid container spacing={2} justify="center" direction="row">
          <Grid item>
            <Button size="small" color="primary" onClick={redirect}>
              Ver Variables
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
