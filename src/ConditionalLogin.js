import React from 'react';
import { useAuthenticated, AuthConsumer } from './Contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import SignIn from './Container/SignInSide';

export default () => {
    const isAuthenticated = useAuthenticated();

    console.log('isAuthenticated: ', isAuthenticated);
    return (
        <div>
            {
                !isAuthenticated ?
                    <AuthConsumer>
                        {
                            context => <SignIn context={context} />
                        }
                    </AuthConsumer> :
                    <Redirect to='/dashboard' />
            }
        </div>
    )
}