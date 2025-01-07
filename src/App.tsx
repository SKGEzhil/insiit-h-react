
import './App.css'
import {RouterProvider} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"
import {AuthProvider} from "./context/authContext.tsx";
import {ToastContainer} from "react-toastify";
import {ToastProvider} from "./context/toastContext.tsx";
import "react-toastify/dist/ReactToastify.css";
import {routes} from "./routes.tsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {navigateTo} from "./store/slices/navigationSlice.ts";

/**
 * App component\
 * This is the root component of the application\
 * It wraps the entire application with the necessary ***context providers***
 * @return {JSX.Element}
 */
function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        // Sync navigation state with current URL on load
        const currentPath = window.location.pathname;
        console.log('currentPath', currentPath.slice(1));
        if(currentPath !== '/'){
            dispatch(navigateTo(currentPath.slice(1)));
        } else {
            dispatch(navigateTo('home'));
        }
    }, [dispatch]);


    return (
    <>
        <GoogleOAuthProvider clientId={"443325784274-so7rpegs6mnn820jag6f1hdja048r3gf.apps.googleusercontent.com"}>
            <ToastProvider>
                <AuthProvider>
                    <RouterProvider router={routes} />
                </AuthProvider>
            </ToastProvider>
        </GoogleOAuthProvider>
        <ToastContainer/>
    </>)
}

export default App
