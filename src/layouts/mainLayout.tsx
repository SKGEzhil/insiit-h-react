import { Outlet } from "react-router-dom";
import HeaderComponent from "../../src/components/headerComponent";
import {useDispatch} from "react-redux";
import {useProgress} from "../hooks/useProgress.ts";
import {resetProgress} from "../store/slices/progressSlice.ts";
import LoadingBar from "react-top-loading-bar";

const MainLayout = () => {

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
            </div>
            <div className="top-36 z-10 relative">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;