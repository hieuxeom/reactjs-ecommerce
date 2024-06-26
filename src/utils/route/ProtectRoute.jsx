import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

function ProtectRoute(props) {

    const navigate = useNavigate();

    const [cookies] = useCookies(['refreshToken']);
    const {refreshToken} = cookies;

    useEffect(() => {
        if (refreshToken) {
            return navigate("/profile/me");
        }
    }, []);

    return (
        <Outlet/>
    );
}

export default ProtectRoute;