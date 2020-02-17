import React from 'react';
import SignUpPresentation from '../Presentational/Forms/SignUp';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

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

  validateEmptyField = (field) => {
    if (typeof field !== 'string') throw new Error(`Field ${field} must be a string`);
    return field.length === 0 ? 'empty' : false;
  }

  validateMinLength = (field) => {
    if (typeof field !== 'string') throw new Error(`Field ${field} must be a string`);
    return field.length < 6 ? 'minLength' : false;
  }

  validateEmail = (email) => {
    if (typeof email !== 'string') throw new Error(`Field ${email} must be a string`);
    return !email.match(/[^@]+@[^\.]+\..+/g) ? 'invalid' : false;
  }

  validateFields = ({
    firstName = '', lastName = '', email = '', password = '',
  }) => {
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

  handleChange = (e) => {
    const { errorMessage, errorState, input } = this.state;

    this.setState({
      ...errorMessage,
      ...errorState,
      input: { ...input, [e.target.id]: e.target.value },
    });
  }

  handleSubmit = (e) => {
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
    const { input, errorState, errorMessage } = this.state;
    return (
      <SignUpPresentation 
        input = {input}
        errorState = {errorState}
        errorMessage = {errorMessage}
        handleChange = {this.handleChange}
        handleSubmit = {this.handleSubmit}
      />
    );
  }
}

export default SignUp;