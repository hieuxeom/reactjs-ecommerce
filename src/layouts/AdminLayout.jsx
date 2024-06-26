import {Outlet} from "react-router-dom";
import AdminHeader from "../components/partials/Header/AdminHeader.jsx";

const AdminLayout = () => {
    return <section className={"w-screen flex flex-col items-center justify-center gap-8"}>
        <AdminHeader/>
        <Outlet/>
    </section>;
};

export default AdminLayout;
