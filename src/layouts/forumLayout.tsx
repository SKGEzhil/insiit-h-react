import {Outlet} from "react-router-dom";
import HeaderComponent from "../../src/components/headerComponent";
import SideComponent from "../../src/components/sideComponent";
import LoadingBar from "react-top-loading-bar";
import {useDispatch} from "react-redux";
import {resetProgress} from "../store/slices/progressSlice.ts";
import {useProgress} from "../hooks/useProgress.ts";
import MediaQuery from "react-responsive";
import FooterComponent from "../components/footerComponent.tsx";


/**
 * Forum Layout has a header component and a side component\
 *
 * **Pages**
 * - ForumPage
 * - QuestionPage
 * - SearchPage
 * - FaqPage
 *
 * @memberof Layouts
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
    const dispatch = useDispatch();
    const {progress} = useProgress();

    return (
        <div className="min-h-screen flex flex-col">
            <LoadingBar
                color='#0077B2'
                progress={progress}
                onLoaderFinished={() => dispatch(resetProgress())}
                height={3}
            />
            
            <HeaderComponent/>
            
            <div className="relative top-16 flex flex-1">
                <MediaQuery minWidth={640}>
                    <div className="w-72 shrink-0">
                        <SideComponent/>
                    </div>
                </MediaQuery>
                
                <div className="flex-1 flex flex-col ">
                    <div className="z-10 flex-1 px-4">
                        <Outlet/>
                    </div>
                </div>
            </div>


            <div className="relative top-16 w-full">
                <FooterComponent/>
            </div>
        </div>
        
    );
};

export default ForumLayout;