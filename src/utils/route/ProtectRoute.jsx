import React from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

function ProtectRoute(props) {

    const navigate = useNavigate();

    const [cookies] = useCookies(['refreshToken']);
    const {refreshToken} = cookies;

    if (refreshToken) {
        return navigate("/profile/me");
    }

    return (
        <Outlet/>
    );
}

export default ProtectRoute;