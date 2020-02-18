import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://www.lurecartagena.com/wp-content/uploads/2015/09/cerro-de-la-popa-0049-2-1.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loading: {
      display: 'flex',
      '& > * + *': {
          marginLeft: theme.spacing(2)
      }
  }
}));

export default function SignUp(props) {
  const classes = useStyles();
  const {
    input,
    errorState,
    isLoading,
    handleSubmit,
    handleChange,
  } = props;
  
  const {
    submitErrorMessage,
    submitErrorOpen,
    handleClickSubmitError
  } = props;

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            {
                submitErrorMessage && 
                <Snackbar 
                    open={submitErrorOpen} 
                    autoHideDuration={4000} 
                    onClose={handleClickSubmitError} 
                    message={submitErrorMessage}
                />                    
            }
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                  error={!!errorState.firstName}
                  helperText={errorState.firstName}
                  onChange={handleChange}
                  value={input.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="lname"
                  error={!!errorState.lastName}
                  helperText={errorState.lastName}
                  onChange={handleChange}
                  value={input.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Correo"
                  name="email"
                  autoComplete="email"
                  error={!!errorState.email}
                  helperText={errorState.email}
                  onChange={handleChange}
                  value={input.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrarse
            </Button>
            { isLoading &&  
                <Grid container justify="center" spacing={2}>
                    <Grid item >
                        <div className={classes.loading}>
                            <CircularProgress />
                        </div>
                    </Grid>
                </Grid>
            }
            <Grid container justify="flex-end" spacing={2}>
              <Grid item>
                <Link href="signin" variant="body2">
                  Ya posee una cuenta? Inicie sesión
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
