import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {login} from "../services/userServices.ts";


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