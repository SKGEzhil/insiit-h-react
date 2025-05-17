import {useOutletContext} from "react-router";
import {useEffect} from "react";
import { Helmet } from 'react-helmet-async';

function OthersPage() {

    const {setPage} = useOutletContext();

    useEffect(() => {
        setPage('others');
    }, []);

    return (
        <>
            <Helmet>
                <title>Others | InsIIT</title>
            </Helmet>
        </>
    );
}

export default OthersPage;