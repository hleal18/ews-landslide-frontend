import React from 'react';
import { useUnauthenticate } from './Contexts/AuthContext';
import { Redirect } from 'react-router-dom';

const Signout = () => {
  useUnauthenticate();
  return (<div>
    <Redirect to='/login'/>
  </div>) 
}

export default Signout;