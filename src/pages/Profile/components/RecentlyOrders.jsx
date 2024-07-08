import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classConfig from "../../../utils/config/class.config.js";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import { apiUrl } from "../../../utils/config/api.config.js";
import { trimString } from "../../../utils/string.js";
import { Chip } from "@nextui-org/react";
import { getOrderStatusVariant } from "../../../utils/dataDefault/orderStatus.js";
import OrderRow from "./OrderRow.jsx";

RecentlyOrders.propTypes = {};

function RecentlyOrders(props) {

    const axiosServer = useAxiosServer();

    const [listOrders, setListOrders] = useState(null);

    const getListOrders = () => {
        axiosServer.get(apiUrl.user.listOrders)
            .then((response) => response.data)
            .then((response) => {
                console.log(response);
                setListOrders(response.data);
            });
    };

    useEffect(() => {
        getListOrders();
    }, []);

    return (
        <section className={"w-full border-1 border-black/10 p-4 rounded-2xl flex flex-col gap-4"}>
            <header>
                <h6 className={classNames(classConfig.fontSize.h6, classConfig.textColor.secondary)}>
                    Đơn hàng gần đây
                </h6>
            </header>
            <main className={"flex flex-col gap-4"}>
                {listOrders && listOrders.map((order, index) =>
                    <OrderRow key={index} orderData={order}/>)}
            </main>
        </section>
    );
}

export default RecentlyOrders;