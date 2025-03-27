// src/context/AuthContext.js
import {createContext, useContext, useState} from 'react';
import {googleLogout, useGoogleLogin} from '@react-oauth/google';
import {createUser, isUserExist} from '../services/userServices';
import { jwtDecode } from "jwt-decode";
import {useShowToast} from "./toastContext.tsx";
import {UserModel} from "../models/userModel.ts";
import {endPointBase} from "../config/constants.ts";


/**
 * @typedef {Object} authContextType
 * @property {UserModel | null} profile
 * @property {Function} login
 * @property {Function} logout
 * @property {Function} setPostLoginAction
 */
type authContextType = {
    profile: UserModel | null;
    login: () => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    setPostLoginAction: (action: () => void) => void;
};


const AuthContext = createContext<authContextType>(
    {
        profile: null,
        login: async () => {},
        logout: () => {},
        isLoading: false,
        setPostLoginAction: () => {},
    }
);

/**
 * AuthProvider is a React component that provides authentication context to its children.
 * @method AuthProvider
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    type GoogleResponse = {
        code: string;
        scope: string;
        authuser: string;
        prompt: string;
    };

    type TokenResponse = GoogleResponse & {
        error?: string;
        error_description?: string;
        error_uri?: string;
    };

    const [profile, setProfile] = useState<UserModel | null>(
        localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {showToast} = useShowToast();

    type tokenType = {
        name: string;
        email: string;
        photoUrl: string;
    }

    const googleLoginHook = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try {
                setIsLoading(true);
                console.log('Login Success:', codeResponse);

                const response = await fetch(`${endPointBase}/auth/google`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        code: codeResponse.code,
                    }),
                });

                const data = await response.json();
                console.log("GOOGLE RESPONSE", data);

                if (data.status === 'error') {
                    throw new Error(data.message);
                }

                localStorage.setItem('token', JSON.stringify(data.data.token));
                const decodedToken: tokenType = jwtDecode(data.data.token);
                console.log("DECODED TOKEN", decodedToken);

                const userExists = await isUserExist(decodedToken.email);
                if (userExists) {
                    console.log("USER EXISTS");
                    setProfile(userExists);
                    localStorage.setItem('userData', JSON.stringify(userExists));
                    postLoginAction();
                } else {
                    console.log("USER DOES NOT EXIST");
                    const newUser = await createUser();
                    setProfile(newUser);
                    localStorage.setItem('userData', JSON.stringify(newUser));
                    postLoginAction();
                }
            } catch (error: any) {
                console.error('Error:', error);
                showToast({status: 'error', message: error.message || 'Failed to authenticate with Google'});
                throw error;
            } finally {
                setIsLoading(false);
            }
        },
        flow: 'auth-code',
        onError: (error) => {
            console.log('Login Failed:', error);
            showToast({status: 'error', message: 'Google login failed'});
            throw error;
        }
    });

    const login = async () => {
        try {
            await googleLoginHook();
        } catch (error: any) {
            console.error('Login error:', error);
            showToast({status: 'error', message: error.message || 'Failed to login'});
            throw error;
        }
    };

    const logout = () => {
        googleLogout();
        localStorage.setItem('userData', JSON.stringify(null));
        localStorage.setItem('token', JSON.stringify(null));
        setProfile(null);
        showToast({status: 'success', message: 'Logged out successfully'});
    };

    const [postLoginAction, setPostLoginAction] = useState<(() => void)>(() => () => {});

    return (
        <AuthContext.Provider value={{profile, login, logout, isLoading, setPostLoginAction}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);