import {useOutletContext} from "react-router";
import {useEffect} from "react";

function OthersPage() {

    const {setPage} = useOutletContext();

    useEffect(() => {
        setPage('others');
    }, []);

    return (
        <></>
    );
}

export default OthersPage;