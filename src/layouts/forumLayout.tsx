
import { Outlet } from "react-router-dom";
import HeaderComponent from "../../src/components/headerComponent";
import SideComponent from "../../src/components/sideComponent";

const MainLayout = () => {
    return (
        <div>
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

export default MainLayout;