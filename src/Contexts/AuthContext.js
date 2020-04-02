import React, { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext({
    token: undefined,
    setToken: () => {}
});

export const AuthProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    
    useEffect(() => {
        if (token && token !== 'null') {
            localStorage.setItem('token', token);
        }
    }, [token]);
    
    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}

// Custom hook used to know in a simple manner
// if there is a token un the provider.
export const useAuthenticated = () => {
    const { token } = useContext(AuthContext);
    return (!token || token === 'null') ? false : true;
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;