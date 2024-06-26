import Header from "../components/Partials/Header/index.jsx";
import {Outlet} from "react-router-dom";

function RootLayout() {
    return <section className={"w-screen flex flex-col items-center justify-center"}>
        <Header/>
        <Outlet/>
    </section>;
}

export default RootLayout;
