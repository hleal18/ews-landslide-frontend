import React from 'react';
import SignUpPresentation from '../Presentational/Forms/SignUp';
import EwsApi from '../Api/ewsApi';
import { Redirect } from 'react-router-dom';
import AuthTransition from '../AuthTransition';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.errorMessage = {
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
          }
    }
    
    this.state = {
      input: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      errorState: {
        firstName: undefined,
        lastName: undefined,
        password: undefined,
        email: undefined
      },
      isLoading: false,
      submitError: {
        submitErrorMessage: undefined,
        submitErrorOpen: false  
      },
      redirect: false,
      token: undefined
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
    
    const errorMessage = this.errorMessage;

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
  
  handleClickSubmitError = (e, r) => {
    if (r === 'clickaway')
       return;
    
    this.setState({ submitError: { submitErrorMessage: undefined, submitErrorOpen: false } });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { input } = this.state;

    const {
      firstName, lastName, password, email,
    } = input;

    const validationResults = this.validateFields({
      firstName, lastName, email, password,
    });

    this.setState({ ...input, errorState: { ...validationResults } });
    
    if (!validationResults.firstName && 
        !validationResults.lastName && 
        !validationResults.email && 
        !validationResults.password) {
        
        this.setState({ isLoading: true });
        const result = await EwsApi.signUp(firstName, lastName, email, password);
        if (result.message) {
          this.setState({ isLoading: false });
            console.log('Error: ', result.message);
            this.setState({ 
            submitError: { 
                submitErrorOpen: true, submitErrorMessage: result.message 
            }});
        }
        else {
          const authres = await EwsApi.login(email, password);

          if (!authres.message) {
            this.setState({ token: authres.auth.token });
          }
           console.log(`Autneticacion exitosa: ${result.user}`);
           console.log(`Redireccionando`);
           this.setState({redirect: true});
           this.setState({ isLoading: false });
        }
    }
  }

  render() {
    const { 
        input, 
        errorState,
        isLoading,
        submitError: { 
            submitErrorMessage, 
            submitErrorOpen 
        } 
    } = this.state;
    
    const errorMessage = this.errorMessage;
    return (
      <div>
        {this.state.redirect && (
          <AuthTransition
            token={this.state.token}
          />
        )}
        <SignUpPresentation
          input={input}
          isLoading={isLoading}
          errorState={errorState}
          errorMessage={errorMessage}
          submitErrorMessage={submitErrorMessage}
          submitErrorOpen={submitErrorOpen}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleClickSubmitError={this.handleClickSubmitError}
        />
      </div>
    );
  }
}

export default SignUp;
