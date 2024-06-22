
// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import {googleLogout, useGoogleLogin} from '@react-oauth/google';
import { createUser, isUserExist } from '../services/userServices';

type authContextType = {
    profile: UserModel | null;
    login: () => void;
    logout: () => void;
    message: { status: string, message: string } | null;
    setPostLoginAction: (action: () => void) => void;
};


const AuthContext = createContext<authContextType>(
    {
        profile: null,
        login: () => {},
        logout: () => {},
        message: null,
        setPostLoginAction: () => {}
    }
);

export const AuthProvider = ({ children }) => {

    type TokenResponse = googleUserInterface & {
        error: string;
        error_description: string;
        error_uri: string;
    };

    type googleUserInterface = Omit<TokenResponse, "error" | "error_description" | "error_uri">;

    const [ user, setUser ]
        = useState<googleUserInterface | null>(null);
    const [ profile, setProfile ]
        = useState<UserModel | null>(localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null);
    const [message, setMessage] = useState<{ status: string, message: string } | null>(null);

    const [postLoginAction, setPostLoginAction] = useState<(() => void)>(() => {});

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log('Login Success:', codeResponse);
            setUser(codeResponse)
            console.log("User", user);
        },
        onError: (error) => console.log('Login Failed:', error)
    });



    useEffect(
        () => {
            if (user) {
                fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                    .then((response) => response.json())
                    .then(async (response) => {
                        console.log('User Info:', response);
                        try {
                            const result = await isUserExist(response.email);
                            if(result === null){
                                console.log("User does not exist");
                                const userData = await createUser(response.name, response.email, response.picture);
                                setProfile(userData);
                                localStorage.setItem('userData', JSON.stringify(userData));
                                postLoginAction();
                                setMessage({status: 'success', message: 'User created successfully'})
                            } else {
                                console.log("User exists");
                                setProfile(result);
                                localStorage.setItem('userData', JSON.stringify(result));
                                postLoginAction();
                                setMessage({status: 'success', message: 'User logged in successfully'})
                            }
                        } catch (e) {
                            setMessage({status: 'error', message: e.message})
                        }
                    })
            }
        },
        [ user ]
    );

    const logout = () => {
        googleLogout();
        localStorage.setItem('userData', JSON.stringify(null));
        setProfile(null);
    };


    return (
        <AuthContext.Provider value={{ profile, login, logout, message, setPostLoginAction }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);