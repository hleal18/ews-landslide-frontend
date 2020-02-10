import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


class SignUp extends React.Component {
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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      errorMessage: {
        empty: {
          firstName: 'Nombre no debe estar vacio',
          lastName: 'Apellidos no debe estar vacio',
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
        firstName: undefined,
        lastName: undefined,
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
    firstName = '', lastName = '', email = '', password = '',
  }) {
    const results = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: undefined,
    };

    const { errorMessage } = this.state;

    let error = this.validateEmptyField(firstName);

    if (error) results.firstName = errorMessage[error].firstName;

    error = this.validateEmptyField(lastName);

    if (error) results.lastName = errorMessage[error].lastName;

    error = this.validateEmptyField(email) || this.validateEmail(email);

    if (error) results.email = errorMessage[error].email;

    error = this.validateEmptyField(password) || this.validateMinLength(password);

    if (error) results.password = errorMessage[error].password;

    return results;
  }

  handleChange(e) {
    const { errorMessage, errorState, input } = this.state;

    this.setState({ ...errorMessage, ...errorState, input: { ...input, [e.target.id]: e.target.value } });
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      input,
      errorMessage,
    } = this.state;

    const {
      firstName, lastName, password, email,
    } = input;

    const validationResults = this.validateFields({
      firstName, lastName, email, password,
    });

    this.setState({ ...input, ...errorMessage, errorState: { ...validationResults } });
  }

  render() {
    const { classes } = this.props;
    const { input, errorState } = this.state;
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                    Registrarse
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={!!errorState.firstName}
                    helperText={errorState.firstName}
                    onChange={this.handleChange}
                    value={input.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    error={!!errorState.lastName}
                    helperText={errorState.lastName}
                    onChange={this.handleChange}
                    value={input.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={!!errorState.email}
                    helperText={errorState.email}
                    onChange={this.handleChange}
                    value={input.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={!!errorState.password}
                    helperText={errorState.password}
                    onChange={this.handleChange}
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
              <Grid container justify="flex-end">
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
}

export default withStyles(useStyles)(SignUp);
