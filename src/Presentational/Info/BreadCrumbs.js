import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import gLink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { withRouter, Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    button: {
        textTransform: 'none'
    }
}));

const BreadCrumbs = ({ history }) => {
    const classes = useStyles();
    return (
    <div>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Button color="inherit" onClick={() => history.push('/dashboard')} className={classes.button}>Dashboard</Button>
        <Button color="inherit" onClick={() => history.push('/critical_points')} className={classes.button} >Puntos Críticos</Button>
        <Typography color="textPrimary">Dispositivos</Typography>
      </Breadcrumbs>
    </div>)
}

export default withRouter(BreadCrumbs);