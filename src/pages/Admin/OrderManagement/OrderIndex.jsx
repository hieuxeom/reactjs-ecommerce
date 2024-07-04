import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import {apiUrl} from "../../../utils/config/api.config.js";
import {toast} from "react-toastify";
import toastConfig from "../../../utils/config/toast.config.js";
import TabHeader from "../../../components/Tab/TabHeader.jsx";
import {
    Button,
    Chip,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {trimString} from "../../../utils/string.js";
import classConfig from "../../../utils/config/class.config.js";
import classNames from "classnames";
import {convertToInternationalizedTime} from "../../../utils/time.js";
import {orderTableColumns} from "../../../utils/dataDefault/tableColumns.js";
import {getOrderStatusVariant, listAdminOrderStatus} from "../../../utils/dataDefault/orderStatus.js";
import {useCookies} from "react-cookie";
import iconConfig from "../../../utils/config/icon.config.jsx";
import {useNavigate} from "react-router-dom";
import {adminUrl} from "../../../utils/config/route.config.js";

OrderIndex.propTypes = {};

function OrderIndex(props) {

    const axiosServer = useAxiosServer();

    const navigate = useNavigate();

    const toastFetch = useRef(null);
    const toastUpdateStatus = useRef(null);

    const [listOrders, setListOrders] = useState(null);

    const getListOrders = () => {

        toastFetch.current = toast.info("Fetching...", toastConfig.loading);

        axiosServer.get(apiUrl.order.getAll)
            .then((response) => {
                setListOrders(response.data.data);
                toast.dismiss(toastFetch.current);
            })
            .catch((error) => {
                const {response} = error;
                if (response.status !== 401) {
                    toast.update(toastFetch.current, toastConfig.error(response.data.message));
                }
            })
            .finally(() => toast.dismiss(toastFetch.current));
    };

    const handleNavigateToDetails = (orderId) => {
        return navigate(adminUrl.order.details(orderId));
    };

    useEffect(() => {
        getListOrders();
    }, []);

    return (
        <div className={"w-full max-w-7xl flex flex-col gap-4"}>
            <TabHeader tabTitle={"Quản lí đơn hàng"}/>
            <Table aria-label={"Table of list orders"}>
                <TableHeader columns={orderTableColumns} aria-label={"Table of list orders"}>
                    {(column) => <TableColumn key={column.key}
                                              className={classNames(classConfig.fontSize.base, "text-center")}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={listOrders ?? []}>
                    {item => <TableRow key={item._id}>
                        <TableCell className={"text-center"}>#{trimString(item._id)}</TableCell>
                        <TableCell className={"text-center"}>{item.customerInfo.fullName}</TableCell>
                        <TableCell className={"text-center"}>{item.orderItems.length} sản phẩm</TableCell>
                        <TableCell className={"text-center"}>{item.totalPrice.toFixed(2)}$</TableCell>
                        <TableCell className={"text-center"}>
                            <Chip
                                variant={"dot"}
                                radius={"sm"}
                                color={getOrderStatusVariant(item.orderStatus).tagColor}
                            >
                                {getOrderStatusVariant(item.orderStatus).label}
                            </Chip>
                        </TableCell>
                        <TableCell
                            className={"text-center"}>{convertToInternationalizedTime(item.orderDate).toString()}</TableCell>
                        <TableCell className={"text-center"}>
                            <Button color={"primary"}
                                    variant={"ghost"}
                                    className={classConfig.fontSize.base}
                                    startContent={iconConfig.detail.base}
                                    onClick={() => handleNavigateToDetails(item._id)}
                            >
                                Chi tiết
                            </Button>
                        </TableCell>

                    </TableRow>}
                </TableBody>
            </Table>
        </div>
    );
}

export default OrderIndex;