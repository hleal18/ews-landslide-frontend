import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import Select from '@material-ui/core/Select';
import Select from "../Forms/SelectForm";
import Container from "@material-ui/core/Container";


import { makeStyles } from "@material-ui/core/styles";

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

// should be [{ id: string, name: string }]
const RiskZoneSelector = ({
  riskZoneOptions = [],
  handleChange,
  currentId = "",
  handleClick,
}) => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} style={{ marginTop: 25 }}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Seleccione la zona de riesgo:
            {/* <Typography
            variant="h5"
            component="h2"
            className={classes.secondTitle}
            color="primary"
          >
            {name}
          </Typography> */}
          </Typography>
          <Select
            handleChange={handleChange}
            id="select-variable-type"
            label="Zonas de Riesgo"
            names={[...riskZoneOptions.map((rzo) => rzo.name)]}
            options={[...riskZoneOptions.map((rzo) => rzo.id)]}
            fullWidth={true}
            value={currentId}
          />

          <div style={{ marginTop: "15px" }}>
            <Button
              color="primary"
              type="primary"
              onClick={handleClick}
              disabled={currentId !== "" ? false : true}
            >
              Exportar datos
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};
export default RiskZoneSelector;
