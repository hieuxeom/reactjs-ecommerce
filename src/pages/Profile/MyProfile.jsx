import React, {useEffect, useState} from "react";
import {apiUrl} from "../../utils/config/api.config.js";
import useAxiosServer from "../../hooks/useAxiosServer.js";

function MyProfile(props) {

    const axiosServer = useAxiosServer();
    const [userData, setUserData] = useState();
    useEffect(() => {
        axiosServer.get(apiUrl.user.me).then((response) => {
            setUserData(response.data);
        });
    }, []);

    return (
        <div>Profile workss!</div>
    );
}

export default MyProfile;