import { Outlet } from "react-router-dom";
import HeaderComponent from "../../src/components/headerComponent";

const MainLayout = () => {
    return (
        <div>
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