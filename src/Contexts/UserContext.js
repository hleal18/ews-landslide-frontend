import React, { useEffect, useContext, useState } from 'react';
import AuthContext from './AuthContext';
import ewsApi from '../Api/ewsApi';

const UserContext = React.createContext({
    user: {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined
    },
    setUser: () => {}
});

export const UserProvider = (props) => {
    const [user, setUser] = useState({});
    const { token } = useContext(AuthContext);
    
    useEffect(() => {
        const getUser = async () => {
            const { user: userResponse } = await ewsApi.getUser(token);
            setUser(userResponse);
        };
        getUser();
    }, [token]);
    
    return (
        <div>
            <UserContext.Provider value = {{ user, setUser }}>
                {props.children}
            </UserContext.Provider>
        </div>
    )
}

export const UserConsumer = UserContext.Consumer;

export default UserContext;