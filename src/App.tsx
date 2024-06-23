
import './App.css'
import HomePage from "./pages/HomePage.tsx";
import {createBrowserRouter} from "react-router-dom";
import AskQuestionPage from "./pages/AskQuestionPage.tsx";
import {RouterProvider} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"
import {AuthProvider} from "./context/authContext.tsx";
import QuestionPage from "./pages/QuestionPage.tsx";
import {ToastContainer} from "react-toastify";
import {ToastProvider} from "./context/toastContext.tsx";



function App() {
  // const [count, setCount] = useState(0)

    const base_route = "";

    const router = createBrowserRouter([

            {
                path: `${base_route}/`,
                element: <HomePage />,
            },
            {
                path: `${base_route}/question/:id`,
                element: <QuestionPage />,
            },
            {
                path: `${base_route}/ask`,
                element: <AskQuestionPage />,
            }

        ]
    );

  return (
    <>
        <GoogleOAuthProvider clientId={"443325784274-so7rpegs6mnn820jag6f1hdja048r3gf.apps.googleusercontent.com"}>
            <ToastProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                    <ToastContainer />
                </AuthProvider>
            </ToastProvider>
        </GoogleOAuthProvider>
    </>)
}

export default App
