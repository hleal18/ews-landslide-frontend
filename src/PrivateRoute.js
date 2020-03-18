import React from 'react';
import { Route } from 'react-router-dom';
import AppBar from './AppBar';
import { CssBaseline, Grid } from '@material-ui/core';

export default function PrivateRoute({
    component: Component,
    ...rest
}) {
    return (
        <Route
            {...rest}

        >
            <React.Fragment>
                <CssBaseline>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <AppBar></AppBar>
                            </Grid>
                            <Grid item xs={12}>
                                <Component></Component>
                            </Grid>
                        </Grid>
                    </div>
                </CssBaseline>
            </React.Fragment>
        </Route>
    )
}