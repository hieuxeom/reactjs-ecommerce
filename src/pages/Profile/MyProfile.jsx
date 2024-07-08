import React, { useEffect, useState } from "react";
import { apiUrl } from "../../utils/config/api.config.js";
import useAxiosServer from "../../hooks/useAxiosServer.js";
import { Button, ButtonGroup } from "@nextui-org/react";
import InformationBlock from "./components/InformationBlock.jsx";
import ListAddressesBlock from "./components/ListAddressesBlock.jsx";
import RecentlyOrders from "./components/RecentlyOrders.jsx";

function MyProfile(props) {

    const axiosServer = useAxiosServer();
    const [userData, setUserData] = useState();

    useEffect(() => {
        axiosServer.get(apiUrl.user.me).then((response) => {
            setUserData(response.data.data);
        });
    }, []);

    return (
        <div className={"w-full max-w-7xl flex  gap-4"}>
            <div className={"w-1/2 flex flex-col gap-4"}>
                <InformationBlock/>
                <ListAddressesBlock/>
            </div>
            <div className={"w-1/2 flex flex-col gap-4"}>
                <RecentlyOrders/>
            </div>
        </div>
    );
}

export default MyProfile;