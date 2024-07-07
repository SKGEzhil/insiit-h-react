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
                color='#0077B2'
                progress={progress}
                onLoaderFinished={() => {dispatch(resetProgress)}}
                height={3}/>
            <div className="relative z-20">
                <HeaderComponent />
            </div>
            <div className="top-16 z-10 relative">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;