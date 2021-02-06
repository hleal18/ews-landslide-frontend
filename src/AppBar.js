import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { useUnauthenticate } from './Contexts/AuthContext';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        // paddingBottom: 24
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
    },
}));

const AppUpperBar = ({ routeToLogin, routeToDashboard, history }) => {
    const classes = useStyles();
    //console.log('History from appbar: ', history);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              SAT - Monitoreo de Deslizamientos
            </Typography>
            <Button color="inherit" onClick={() => history.push("/dashboard")}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={() => history.push("/alerts")}>
              Alertas
            </Button>
            <Button color="inherit" onClick={() => history.push("/export")}>
              Exportar
            </Button>
            <Button color="inherit" onClick={() => history.push("/riskzones")}>
              Zonas de Riesgo
            </Button>
            <Button
              style={{ marginLeft: "15px" }}
              color="inherit"
              onClick={() => {
                history.push("/signout");
              }}
            >
              Cerrar Sesion
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default withRouter(AppUpperBar);