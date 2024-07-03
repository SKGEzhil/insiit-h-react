
import './App.css'
import {RouterProvider} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"
import {AuthProvider} from "./context/authContext.tsx";
import {ToastContainer} from "react-toastify";
import {ToastProvider} from "./context/toastContext.tsx";
import {routes} from "./routes.tsx";

function App() {

  return (
    <>
        <GoogleOAuthProvider clientId={"443325784274-so7rpegs6mnn820jag6f1hdja048r3gf.apps.googleusercontent.com"}>
            <ToastProvider>
                <AuthProvider>
                    <RouterProvider router={routes} />
                    <ToastContainer/>
                </AuthProvider>
            </ToastProvider>
        </GoogleOAuthProvider>
    </>)
}

export default App
