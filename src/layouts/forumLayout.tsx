import {Outlet} from "react-router-dom";
import HeaderComponent from "../../src/components/headerComponent";
import SideComponent from "../../src/components/sideComponent";
import LoadingBar from "react-top-loading-bar";
import {useDispatch} from "react-redux";
import {resetProgress} from "../store/slices/progressSlice.ts";
import {useProgress} from "../hooks/useProgress.ts";
import MediaQuery from "react-responsive";


/**
 * Forum Layout has a header component and a side component\
 *
 * **Pages**
 * - ForumPage
 * - QuestionPage
 * - SearchPage
 *
 * @returns {Outlet}
 *
 * @example
 * return
 *      <ForumLayout>
 *          <ForumPage/>
 *      </ForumLayout>
 *
 */
const ForumLayout = () => {

    // const progress = useSelector((state) => state.progressSlice.value);
    const dispatch = useDispatch();
    const {progress} = useProgress();

    return (
        <div>
            {
                <div>
                    <LoadingBar
                        color='#0077B2'
                        progress={progress}
                        onLoaderFinished={() => {
                            dispatch(resetProgress)
                        }}
                        height={3}/>
                    <div className="relative z-20">
                        <HeaderComponent/>
                        <MediaQuery minWidth={640}>
                            <SideComponent/>
                        </MediaQuery>

                    </div>
                    <div className="top-16 tablet:ml-72 z-10 relative">
                        <Outlet/>
                    </div>
                </div>
            }

        </div>
    );
};

export default ForumLayout;