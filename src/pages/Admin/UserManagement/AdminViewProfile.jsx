import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import { toast } from "react-toastify";
import toastConfig from "../../../utils/config/toast.config.js";
import { apiUrl } from "../../../utils/config/api.config.js";
import { adminUrl } from "../../../utils/config/route.config.js";
import TabHeader from "../../../components/Tab/TabHeader.jsx";
import iconConfig from "../../../utils/config/icon.config.jsx";
import classNames from "classnames";
import classConfig from "../../../utils/config/class.config.js";
import { formatDate } from "../../../utils/time.js";
import { Button, Divider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { adminBlockHistoryTableColumns } from "../../../utils/dataDefault/tableColumns.js";
import OrderRow from "../../Profile/components/OrderRow.jsx";

AdminViewProfile.propTypes = {};

function AdminViewProfile(props) {

    const { userId } = useParams();

    const axiosServer = useAxiosServer();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);
    const [userOrders, setUserOrders] = useState(null);
    const toastActivation = useRef(null);

    const handleUnBlock = () => {
        toastActivation.current = toast.info("Updating...", toastConfig.loading);
        axiosServer.put(apiUrl.user.activation(userId), {
            isActive: true
        })
            .then((response) => response.data)
            .then((response) => {
                toast.update(toastActivation.current, toastConfig.success("Successfully Unblocked"));
                navigate(adminUrl.user.index);
            })
            .catch((error) => {
                const { response } = error;
                console.log(response);
            });
    };

    const handleNavigateToBlock = () => {
        return navigate(adminUrl.user.block(userId));
    };

    const getUserInfo = () => {
        return axiosServer.get(apiUrl.user.details(userId))
            .then((response) => response.data)
            .then((response) => {
                setUserInfo(response.data);
            });
    };

    const getOrderInfo = () => {
        return axiosServer.get(apiUrl.user.listOrdersByUserId(userId))
            .then((response) => response.data)
            .then((response) => {
                console.log(response.data);
                setUserOrders(response.data);
            });
    };

    useEffect(() => {
        if (userId) {
            getUserInfo();
            getOrderInfo();

        }
    }, [userId]);

    return (
        <div className={"w-full max-w-7xl flex flex-col gap-4"}>

            <div className={"w-full"}>
                <TabHeader tabTitle={"Thông tin tài khoản"} buttonData={{
                    icon: iconConfig.back.base,
                    urlBack: adminUrl.user.index,
                    label: "Quay lại",
                    color: "secondary"
                }}/>
            </div>
            <div className={"w-full p-4 shadow-custom rounded-xl flex flex-col gap-4"}>
                <header className={"w-full flex"}>
                    <h6 className={classNames(classConfig.fontSize.h6, classConfig.textColor.default)}>
                        Tóm tắt thông tin
                    </h6>
                </header>
                <main className={"w-full"}>
                    {userInfo &&
                        <div className={"w-full flex justify-between gap-4"}>
                            <div className={"w-full flex flex-col gap-2"}>
                                <div className={"flex justify-between items-center gap-8"}>
                                    <p>Tên người dùng</p>
                                    <p className={classConfig.textColor.secondary}>{userInfo.userName}</p>
                                </div>
                                <div className={"flex justify-between items-center gap-8"}>
                                    <p>Email</p>
                                    <p className={classConfig.textColor.secondary}>{userInfo.email}</p>
                                </div>
                                <div className={"flex justify-between items-center gap-8"}>
                                    <p>Ngày tạo tài khoản</p>
                                    <p className={classConfig.textColor.secondary}>{formatDate(userInfo.createdAt)}</p>
                                </div>
                            </div>
                            <div className={"w-full flex justify-between items-center gap-2"}>
                                <Divider orientation={"vertical"}/>
                                <div className={" w-full flex flex-col items-center gap-4"}>
                                    <p>Đơn hàng</p>
                                    <h3 className={classNames(classConfig.fontSize.h3, classConfig.textColor.secondary)}>{userOrders?.length ?? "-"}</h3>
                                </div>
                                <Divider orientation={"vertical"}/>
                                <div className={" w-full flex flex-col items-center gap-4"}>
                                    <p>Tổng số lần bị khóa</p>
                                    <h3 className={classNames(classConfig.fontSize.h3, classConfig.textColor.secondary)}>{userInfo.blockHistory.length}</h3>
                                </div>
                                <Divider orientation={"vertical"}/>
                                <div className={"w-full flex flex-col items-center gap-4"}>
                                    {userInfo.isActive
                                        ? <Button color={"danger"}
                                                  startContent={iconConfig.block.base}
                                                  onClick={handleNavigateToBlock}
                                        >
                                            Khóa tài khoản
                                        </Button>
                                        : <Button color={"success"}
                                                  startContent={iconConfig.unBlock.base}
                                                  onClick={handleUnBlock}
                                        >
                                            Mở khóa
                                        </Button>}
                                </div>
                            </div>
                        </div>
                    }
                </main>
            </div>
            <div className={"flex gap-4"}>
                <div className={"w-full   h-max  p-4 shadow-custom rounded-xl flex flex-col gap-4"}>
                    <header className={"w-full flex"}>
                        <h6 className={classNames(classConfig.fontSize.h6, classConfig.textColor.default)}>
                            Lịch sử đơn hàng
                        </h6>
                    </header>
                    <main className={"flex flex-col gap-2"}>
                        {
                            userOrders?.length > 0
                                ? userOrders.map((order, index) =>
                                    <OrderRow key={index} orderData={order} isAdminView/>
                                )
                                : <div className={"w-full justify-center"}>
                                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray, "italic")}>Người
                                        dùng này không có
                                        đơn hàng nào</p>
                                </div>
                        }
                    </main>
                </div>
                <div className={"w-full p-4 shadow-custom rounded-xl flex flex-col gap-4"}>
                    <header className={"w-full flex"}>
                        <h6 className={classNames(classConfig.fontSize.h6, classConfig.textColor.default)}>
                            Lịch sử khóa tài khoản
                        </h6>
                    </header>
                    <main>
                        <Table aria-label={"History blocks"}>
                            <TableHeader columns={adminBlockHistoryTableColumns}>
                                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={userInfo ? userInfo.blockHistory : []}
                                       emptyContent={
                                           <div className={"w-full flex justify-center"}>
                                               Tài khoản này chưa từng bị khóa
                                           </div>
                                       }
                            >
                                {(history) =>
                                    <TableRow key={history._id}>
                                        <TableCell>{formatDate(history.blockTime)}</TableCell>
                                        <TableCell>{history.reason}</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AdminViewProfile;