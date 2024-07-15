// src/context/AuthContext.js
import {createContext, useContext, useState} from 'react';
import {googleLogout, useGoogleLogin} from '@react-oauth/google';
import {createUser, isUserExist} from '../services/userServices';
import { jwtDecode } from "jwt-decode";
import {useShowToast} from "./toastContext.tsx";
import {UserModel} from "../models/userModel.ts";
import {endPointBase} from "../config/constants.ts";


type authContextType = {
    profile: UserModel | null;
    login: () => void;
    logout: () => void;
    // message: { status: string, message: string } | null;
    setPostLoginAction: (action: () => void) => void;
    // token: string | null;
};


const AuthContext = createContext<authContextType>(
    {
        profile: null,
        login: () => {
        },
        logout: () => {
        },
        // message: null,
        setPostLoginAction: () => {
        },
        // token: null
    }
);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {

    type TokenResponse = googleUserInterface & {
        error: string;
        error_description: string;
        error_uri: string;
    };

    type googleUserInterface = Omit<TokenResponse, "error" | "error_description" | "error_uri">;


    const [profile, setProfile]
        = useState<UserModel | null>(localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null);
    // const [message, setMessage] = useState<{ status: string, message: string } | null>(null);

    const [postLoginAction, setPostLoginAction] = useState<(() => void)>(() => () => {});
    const {showToast} = useShowToast();

    type tokenType = {
        name: string;
        email: string;
        photoUrl: string;
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log('Login Success:', codeResponse);
            // setUser(codeResponse)

            fetch(`${endPointBase}/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: codeResponse.code,
                }),
            })
                .then(r => r.json())
                .then(r => {
                    console.log("GOOGLE RESPONSE", r)
                    if(r.status === 'error'){
                        throw new Error(r.message)
                    } else {
                        localStorage.setItem('token', JSON.stringify(r.data.token));

                        const decodedToken: tokenType = jwtDecode(r.data.token);
                        console.log("DECODED TOKEN", decodedToken);

                        isUserExist(decodedToken.email).then((response) => {
                            console.log("RESPONSE", response);
                            if (response !== null) {
                                console.log("USER EXIST");
                                setProfile(response);
                                localStorage.setItem('userData', JSON.stringify(response));
                                console.log(typeof postLoginAction);
                                postLoginAction();
                            } else {
                                console.log("USER NOT EXIST");
                                createUser().then((response) => {
                                    console.log("RESPONSE", response);
                                    setProfile(response);
                                    localStorage.setItem('userData', JSON.stringify(response));
                                    postLoginAction();
                                }).catch(
                                    (error) => {
                                        console.error('Error:', error);
                                        showToast({status: 'error', message: error.message});
                                    }
                                );
                            }
                        }).catch(
                            (error) => {
                                console.error('Error:', error);
                                showToast({status: 'error', message: error.message});
                            }
                        );

                    }
                });

            // console.log("User", user);
        },
        flow: 'auth-code',
        onError: (error) => console.log('Login Failed:', error)
    });

    const logout = () => {
        googleLogout();
        localStorage.setItem('userData', JSON.stringify(null));
        localStorage.setItem('token', JSON.stringify(null));
        setProfile(null);
    };


    return (
        <AuthContext.Provider value={{profile, login, logout, setPostLoginAction}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);