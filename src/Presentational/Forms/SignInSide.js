import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://www.lurecartagena.com/wp-content/uploads/2015/09/cerro-de-la-popa-0049-2-1.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loading: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();
  const { errorState, input, isLoading, handleChange, handleSubmit } = props;

  const { submitErrorOpen, submitErrorMessage, handleClickSubmitError } = props;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {submitErrorMessage && (
            <Snackbar
              open={submitErrorOpen}
              onClose={handleClickSubmitError}
              message={submitErrorMessage}
              autoHideDuration={4000}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
          )}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errorState.email}
              helperText={errorState.email}
              onChange={handleChange}
              value={input.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errorState.password}
              helperText={errorState.password}
              onChange={handleChange}
              value={input.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Iniciar Sesión
            </Button>

            {isLoading && (
              <Grid container justify="center" spacing={2}>
                <Grid item>
                  <div className={classes.loading}>
                    <CircularProgress />
                  </div>
                </Grid>
              </Grid>
            )}
            <Grid container spacing={2}>
              <Grid item>
                <Link href="/signup" variant="body2">
                  No posee una cuenta? Regístrese
                </Link>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 50 }}>
              <Grid item>
                <Typography component="h3" variant="h5">
                  Sistema de monitoreo SAT
                </Typography>
                <Typography component="p">
                  Plataforma creada para el proyecto “Sistema de alerta temprana
                  para el monitoreo de deslizamientos de tierra mediante
                  internet de las cosas” del grupo de investigación GIMATICA,
                  financiado por la convocatoria para proyectos de investigación
                  de semilleros de la Universidad de Cartagena del año 2018.{" "}
                  <br />
                  <b>Por la tesis de los estudiantes</b>: Humberto Leal Betancur y
                  Rafael Mendoza Rodríguez. <br />
                  <b>Tesis dirigida por el profesor</b>: Amaury Cabarcas Alvarez
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
