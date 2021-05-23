import React, { useContext, useState, useMemo } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import UserContext from "../Contexts/UserContext";
import AuthContext from "../Contexts/AuthContext";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginTop: 48,
        marginLeft: 48,
        marginRight: 48,
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
    textField: {
        marginTop: "20px",
    },
});

export const UserManager = () => {
    const classes = useStyles();
    const { user } = useContext(UserContext);
    const { token } = useContext(AuthContext);
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName ?? "");
    const [lastName, setLastName] = useState(user.lastName ?? "");
    const [email, setEmail] = useState(user.email ?? '');
    const [emailsToNotify, setEmailsToNotify] = useState(
        user.emailsToNotify?.join(',\t') ?? ''
    );

    console.log("EmailsToNotify", emailsToNotify);
    useMemo(() => {
        setFirstName(user.firstName ?? "");
        setLastName(user.lastName ?? "");
        setEmail(user.email ?? "");
        setEmailsToNotify(user.emailsToNotify?.join(',\t') ?? '');
    }, [user]);

    console.log("User information: ", user);
    return (
        <div className={classes.root}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2" color="primary">
                        Informacion de Usuario
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        className={classes.textField}
                    >
                        <FormWithLabel>
                            <Typography>Nombre</Typography>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="firstName"
                                disabled={!editModeEnabled}
                                // label="Primer Nombre"
                                fullWidth
                                required={true}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                // onChange={props.handleText}
                                // helperText={props.errorState.name}
                                // error={!!props.errorState.name}
                            />
                        </FormWithLabel>
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        className={classes.textField}
                    >
                        <FormWithLabel>
                            <Typography>Apellido</Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="firstName"
                                // label="Primer Nombre"
                                disabled={!editModeEnabled}
                                fullWidth
                                required={true}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                // onChange={props.handleText}
                                // helperText={props.errorState.name}
                                // error={!!props.errorState.name}
                            />
                        </FormWithLabel>
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        className={classes.textField}
                    >
                        <FormWithLabel>
                            <Typography>Correo</Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="firstName"
                                disabled={true}
                                // label="Primer Nombre"
                                fullWidth
                                required={true}
                                value={email}
                                helperText='Correo usado durante registro no se puede modificar'
                                // onChange={(e) => setFirstName(e.target.value)}
                                // onChange={props.handleText}
                                // helperText={props.errorState.name}
                                // error={!!props.errorState.name}
                            />
                        </FormWithLabel>
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        className={classes.textField}
                    >
                        <FormWithLabel>
                            <Typography>Correos a notificar</Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="firstName"
                                disabled={!editModeEnabled}
                                // label="Primer Nombre"
                                fullWidth
                                required={true}
                                value={emailsToNotify}
                                helperText="Cada correo separado por coma"
                                onChange={(e) =>
                                    setEmailsToNotify(e.target.value)
                                }
                                // onChange={props.handleText}
                                // helperText={props.errorState.name}
                                // error={!!props.errorState.name}
                            />
                        </FormWithLabel>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid
                        container
                        item
                        spacing={1}
                        justify="center"
                        direction="row"
                    >
                        {!editModeEnabled ? (
                            <Button
                                size="small"
                                color="primary"
                                onClick={() => setEditModeEnabled(true)}
                                className={classes.watch_node_button}
                            >
                                Editar usuario
                            </Button>
                        ) : (
                            <div>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => setEditModeEnabled(false)}
                                    className={classes.watch_node_button}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => setEditModeEnabled(true)}
                                    className={classes.watch_node_button}
                                >
                                    Actualizar datos
                                </Button>
                            </div>
                        )}
                    </Grid>
                </CardActions>
            </Card>
        </div>
    );
};

const FormWithLabel = (props) => (
    <Grid
        container
        alignItems="center"
        spacing={3}
        direction="row"
        justify="flex-start"
    >
        <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
            {props.children[0]}
        </Grid>
        <Grid item xs={12} sm={12} md={11} lg={11} xl={11}>
            {props.children[1]}
        </Grid>
    </Grid>
);
