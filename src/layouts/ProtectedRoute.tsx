import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {login} from "../services/userServices.ts";

/**
 * This layout is used to protect routes
 * - It checks if the user is ***authorized*** when the component is mounted
 * - If the user is authorized, it renders the ***outlet***
 * - If not authorized, it renders an ***error*** message
 *
 * **Pages**
 * - AdminPage
 *
 * @returns {Outlet|JSX.Element}
 *
 * @example
 * return
 *      <ProtectedRoute>
 *          <AdminPage/>
 *      </ProtectedRoute>
 *
 */
const ProtectedRoute = () => {

    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loginUser = async () => {
            try {
                await login().then((response) => {
                    console.log(response);
                    setIsAuthorized(true);
                });
            } catch (error) {
                console.error('Error:', error.message);
                setError(error.message);
                setIsAuthorized(false);
            }
        };

        loginUser();
    }, []);

    return (

        <>
            {
                isAuthorized ?
                    <div>
                        <Outlet/>
                    </div>
                    :
                    <div className='py-10'>
                        <h1 className='text-red-700'>{error}</h1>
                    </div>
            }
        </>
    );
};

export default ProtectedRoute;