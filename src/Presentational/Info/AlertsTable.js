import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    fontSize: 20,
    justifyContent: "center"
  }
});

const getLocalDate = timestamp => `${new Date(timestamp).toLocaleDateString('co-CO')} - ${new Date(timestamp).toLocaleTimeString('co-CO')}`;


const AlertsTable = ({ alerts = [] }) => {
  const classes = useStyles();

  // 9 columnas
  return (
    <div>
      <Container maxWidth={false} style={{ marginTop: 25 }}>
        {alerts.length === 0 ? (
          <Card>
            <CardContent>
              <Typography className={classes.title} color="textPrimary"  style={{ marginBottom: "15px" }}>
                No hay zonas de riesgo con alertas.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Zona de Riesgo</TableCell>
                  <TableCell align="center">Punto Critico</TableCell>
                  <TableCell align="center">Nodo Sensor</TableCell>
                  <TableCell align="center">Variable</TableCell>
                  <TableCell align="center">Valor Registrado</TableCell>
                  <TableCell align="center">Umbral</TableCell>
                  <TableCell align="center">Email Notificado</TableCell>
                  <TableCell align="center">Fecha</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alerts.map((alert, idx) => (
                  <TableRow key={idx}>
                    <TableCell component="th" scope="row">
                      {alert.riskZoneName}
                    </TableCell>
                    <TableCell align="center">
                      {alert.criticalSpotName}
                    </TableCell>
                    <TableCell align="center">{alert.sensorNodeName}</TableCell>
                    <TableCell align="center">{alert.variableName}</TableCell>
                    <TableCell align="center">{alert.variableValue}</TableCell>
                    <TableCell align="center">{alert.thresholdValue}</TableCell>
                    <TableCell align="center">{alert.notified}</TableCell>
                    <TableCell align="center">
                      {getLocalDate(alert.timestamp)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </div>
  );
}

export default AlertsTable;