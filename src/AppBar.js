import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

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
    console.log('History from appbar: ', history);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        La Popita
                    </Typography>
                    {/* <Button color="inherit" onClick={() => history.push('/login')}>Login</Button> */}
                    <Button color="inherit" onClick={() => history.push('/dashboard')}>Dashboard</Button>
                    <Button color="inherit" onClick={() => history.push('/dashboard')}>Alertas</Button>
                    <Button color="inherit" onClick={() => history.push('/dashboard')}>Umbrales</Button>
                    <Button color="inherit" onClick={() => history.push('/devices')}>Dispositivos</Button>
                    <Button color="inherit" onClick={() => history.push('/critical_points')}>Puntos Críticos</Button>
                    <Button color="inherit" onClick={() => history.push('/dashboard')}>Zonas de Estudio</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(AppUpperBar);