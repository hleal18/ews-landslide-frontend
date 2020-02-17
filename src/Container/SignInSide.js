import React from 'react';
import SignInSidePresentation from '../Presentational/Forms/SignInSide';

class SignInSide extends React.Component {
  constructor(props) {
    super(props);

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

  validateEmptyField = (field) => {
    if (typeof field !== 'string') throw new Error(`Field ${field} must be a string`);
    return field.length === 0 ? 'empty' : false;
  }

  validateMinLength= (field) => {
    if (typeof field !== 'string') throw new Error(`Field ${field} must be a string`);
    return field.length < 6 ? 'minLength' : false;
  }

  validateEmail = email => {
    if (typeof email !== 'string') throw new Error(`Field ${email} must be a string`);
    return !email.match(/[^@]+@[^\.]+\..+/g) ? 'invalid' : false;
  }

  validateFields = ({
    email = '', password = '',
  }) => {
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
      password, email,
    } = input;

    const validationResults = this.validateFields({
      email, password,
    });

    this.setState({ ...input, ...errorMessage, errorState: { ...validationResults } });
  }


  render() {
    const { input, errorState, errorMessage } = this.state;

    return (
    
        <SignInSidePresentation 
            errorState ={errorState}
            input = {input}
            errorMessage = {errorMessage}
            handleChange = {this.handleChange}
            handleSubmit = {this.handleSubmit}
        />
        
    );
  }
}


export default SignInSide;