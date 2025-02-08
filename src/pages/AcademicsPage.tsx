import {useOutletContext} from "react-router";
import {useEffect} from "react";

/**
 * Academics Page
 * - It sets the blog page to `academics` in the outlet context
 * - It does ***not*** render anything
 *
 * @memberof Pages
 * @returns {JSX.Element} Empty Fragment
 */
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