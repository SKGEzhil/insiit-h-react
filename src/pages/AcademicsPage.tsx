import {useOutletContext} from "react-router";
import {useEffect} from "react";

function AcademicsPage() {

    const {setPage} = useOutletContext();

    useEffect(() => {
        setPage('academics');
    }, []);

  return (
    <></>
  );
}

export default AcademicsPage;