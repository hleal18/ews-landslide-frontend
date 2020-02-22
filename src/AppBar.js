import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        paddingBottom: 24
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
    },
}));

export default function AppUpperBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    {/* <NavLink to="/dashb" activeClassName={classes.title} style={{ textDecoration: 'none' }}> */}
                        <Typography variant="h6" className={classes.title}>
                            Monitoreo de Montañitas, Corre!
                        </Typography>
                    {/* </NavLink> */}
                    <Button color="primary" variant="contained" component={Link} to="/login">Login</Button>
                    <Link to="/dashboard"><Button variant="contained" color="primary">Dashboard</Button></Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}