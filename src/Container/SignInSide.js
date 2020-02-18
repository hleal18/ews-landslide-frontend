import React from 'react';
import SignInSidePresentation from '../Presentational/Forms/SignInSide';
import { Redirect } from 'react-router-dom';
import EwsApi from '../Api/ewsApi';

class SignInSide extends React.Component {
  constructor(props) {
    super(props);
    
    this.errorMessage = {
            empty: {
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
        email: '',
        password: '',
      },      
      errorState: {
        password: undefined,
        email: undefined,
      },
      submitError: {
          submitErrorMessage: undefined,
          submitErrorOpen: false
      },
      redirect: false
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

    const errorMessage = this.errorMessage;

    let error = this.validateEmptyField(email) || this.validateEmail(email);

    if (error) results.email = errorMessage[error].email;

    error = this.validateEmptyField(password) || this.validateMinLength(password);

    if (error) results.password = errorMessage[error].password;

    return results;
  }

  handleChange = (e) => {
    const { errorState, input } = this.state;

    this.setState({
      ...errorState,
      input: { ...input, [e.target.id]: e.target.value },
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const {
      input
    } = this.state;

    const {
      password, email,
    } = input;

    const validationResults = this.validateFields({
      email, password,
    });

    this.setState({ ...input, errorState: { ...validationResults } });
    
    if (!validationResults.email && 
        !validationResults.password) {
        const result = await EwsApi.login(email, password);
        
        if (result.message) { 
            this.setState({ 
                submitError: {
                    submitErrorOpen: true, 
                    submitErrorMessage: result.message
                } 
            });
        }
        else this.setState({ redirect: true });
    }
  }
  
  handleClickSubmitError = (e, r) => {
    if (r === 'clickaway') 
       return;
        
    this.setState({ submitError: { submitErrorOpen: false, submitErrorMessage: undefined } });
  }


  render() {
    const { input, 
        errorState, 
        redirect, 
        submitError: { 
            submitErrorMessage, 
            submitErrorOpen 
        } 
    } = this.state;
    
    const errorMessage = this.errorMessage;
    return (
        <div>
            {redirect && <Redirect to='/dashboard' />}
            <SignInSidePresentation 
                errorState ={errorState}
                input = {input}
                errorMessage = {errorMessage}
                submitErrorMessage={submitErrorMessage}
                submitErrorOpen={submitErrorOpen}
                handleClickSubmitError={this.handleClickSubmitError}
                handleChange = {this.handleChange}
                handleSubmit = {this.handleSubmit}
                
            />
        </div>
    );
  }
}


export default SignInSide;
