
import { Outlet } from "react-router-dom";
import HeaderComponent from "../../src/components/headerComponent";
import SideComponent from "../../src/components/sideComponent";
import LoadingBar from "react-top-loading-bar";
import {useDispatch} from "react-redux";
import {resetProgress} from "../store/slices/progressSlice.ts";
import {useProgress} from "../hooks/useProgress.ts";

const ForumLayout = () => {

    // const progress = useSelector((state) => state.progressSlice.value);
    const dispatch = useDispatch();
    const {progress} = useProgress();

    return (
        <div>
            <LoadingBar
                color="#ffffff"
                progress={progress}
                onLoaderFinished={() => {dispatch(resetProgress)}}
                height={2}/>
            <div className="relative z-20">
                <HeaderComponent />
                <SideComponent />
            </div>
            <div className="top-36 ml-60 z-10 relative">
                <Outlet />
            </div>
        </div>
    );
};

export default ForumLayout;