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
import CircularProgress from "@material-ui/core/CircularProgress";

import UserContext from "../Contexts/UserContext";
import AuthContext from "../Contexts/AuthContext";
import ewsApi from "../Api/ewsApi";

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

class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomError";
    }
}

const validateEmail = (email) => {
    if (typeof email !== 'string') throw new Error(`Field ${email} must be a string`);
    if (!email.match(/[^@]+@[^\.]+\..+/g)) 
        throw new CustomError("Formato invalido para email");
    else return false;
}

const validateUserSubmit = ({
    firstName,
    lastName,
    email,
    emailsToNotify,
}) => {
    if (!firstName || firstName.length === 0)
        throw new CustomError(`Primer nombre no puede estar vacio`);
    if (!lastName || lastName.length === 0)
        throw new CustomError(`Apellido no puede estar vacio`);
    if (!email || email.length === 0) {
        validateEmail(email);
        throw new CustomError(`Correo no puede estar vacio`);
    }
    if (!emailsToNotify || emailsToNotify.length === 0)
        throw new CustomError(`Correos a notificar no pueden estar vacios`);
};

const adaptEmailsToNotifyInput = (emailsToNotifyStr) => {
    try {
        const result = emailsToNotifyStr.split(",").map((str) => str.trim());
        console.log("result", result);
        result.forEach((email) => validateEmail(email));
        return result;
    } catch (e) {
        throw new CustomError(
            "Error con los correos a notificar, verifique que esten separados por coma y este en el formato apropiado"
        );
    }
};
export const UserManager = () => {
    const classes = useStyles();
    const { user, setUser } = useContext(UserContext);
    const { token } = useContext(AuthContext);
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName ?? "");
    const [lastName, setLastName] = useState(user.lastName ?? "");
    const [email, setEmail] = useState(user.email ?? "");
    const [emailsToNotify, setEmailsToNotify] = useState(
        user.emailsToNotify?.join(",\t") ?? ""
    );
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);

    console.log("EmailsToNotify", emailsToNotify);
    useMemo(() => {
        setFirstName(user.firstName ?? "");
        setLastName(user.lastName ?? "");
        setEmail(user.email ?? "");
        setEmailsToNotify(user.emailsToNotify?.join(",\t") ?? "");
    }, [user]);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            validateUserSubmit({ firstName, lastName, email, emailsToNotify });
            const adaptedEmailsToNotify =
                adaptEmailsToNotifyInput(emailsToNotify);

            const updatedUser = await ewsApi.patchUser(token, {
                firstName,
                lastName,
                email,
                emailsToNotify: adaptedEmailsToNotify,
            });
            setUser(updatedUser);
            setEditModeEnabled(false);
            setError(undefined);
        } catch (e) {
            console.log('error: ', e.message);
            if (e.name === "CustomError") {
                setError(e.message);
            } else {
                setError(`Sucedio un error ${e.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

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
                                disabled={!editModeEnabled}
                                onChange={(e) => setEmail(e.target.value)}
                                // label="Primer Nombre"
                                fullWidth
                                required={true}
                                value={email}
                                // helperText="Correo usado durante registro no se puede modificar"
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
                    {
                        error && 
                        <Typography
                            variant="body2"
                            component="p"
                            className={classes.textField}
                            color='error'
                        >
                            {error}
                        </Typography>
                    }   
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
                                    onClick={() => handleSubmit()}
                                    className={classes.watch_node_button}
                                >
                                    Actualizar datos
                                </Button>
                                {isLoading && (
                                    <Grid
                                        container
                                        justify="center"
                                        spacing={2}
                                    >
                                        <Grid item>
                                            <div>
                                                <CircularProgress />
                                            </div>
                                        </Grid>
                                    </Grid>
                                )}
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
