import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar stays fixed */}
            <div className="flex-none">
                <Sidebar />
            </div>

            {/* Main content scrolls independently */}
            <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
