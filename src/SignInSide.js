import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom';


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
}));

class SignInSide extends React.Component {
  constructor(props) {
    super(props);

    this.validateEmail = this.validateEmail.bind(this);
    this.validateEmptyField = this.validateEmptyField.bind(this);
    this.validateMinLength = this.validateMinLength.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      input: {
        email: '',
        password: '',
      },
      errorMessage: {
        empty: {
          email: 'Email no puede estar vacio',
          password: 'Contraseña no puede estar vacia',
        },
        minLength: {
          password: 'Contraseña no puede tener menos de 6 caracteres',
        },
        invalid: {
          email: 'Correo debe tener el formato: direccion@proveedor.dominio',
        },
      },
      errorState: {
        password: undefined,
        email: undefined,
      },
    };
  }

  validateEmptyField(field) {
    if (typeof field !== 'string') throw new Error(`Field ${field} must be a string`);
    return field.length === 0 ? 'empty' : false;
  }

  validateMinLength(field) {
    if (typeof field !== 'string') throw new Error(`Field ${field} must be a string`);
    return field.length < 6 ? 'minLength' : false;
  }

  validateEmail(email) {
    if (typeof email !== 'string') throw new Error(`Field ${email} must be a string`);
    return !email.match(/[^@]+@[^\.]+\..+/g) ? 'invalid' : false;
  }

  validateFields({
    email = '', password = '',
  }) {
    const results = {
      email: undefined,
      password: undefined,
    };

    const { errorMessage } = this.state;

    let error = this.validateEmptyField(email) || this.validateEmail(email);

    if (error) results.email = errorMessage[error].email;

    error = this.validateEmptyField(password) || this.validateMinLength(password);

    if (error) results.password = errorMessage[error].password;

    return results;
  }

  handleChange(e) {
    const { errorMessage, errorState, input } = this.state;

    this.setState({
      ...errorMessage,
      ...errorState,
      input: { ...input, [e.target.id]: e.target.value },
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      input,
      errorMessage,
    } = this.state;

    const {
      password, email,
    } = input;

    const validationResults = this.validateFields({
      email, password,
    });

    this.setState({ ...input, ...errorMessage, errorState: { ...validationResults } });
  }


  render() {
    const { classes } = this.props;
    const { input, errorState } = this.state;

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                      Iniciar Sesión
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
                value={input.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Mantener sesión iniciada"
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
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                            Olvidó contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                          No posee una cuenta? Regístrese
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}


export default withStyles(useStyles)(SignInSide);
