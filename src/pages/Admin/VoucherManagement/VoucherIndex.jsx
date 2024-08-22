import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import TabHeader from "../../../components/Tab/TabHeader.jsx";
import { IoMdAdd } from "react-icons/io";
import classConfig from "../../../utils/config/class.config.js";
import { adminUrl } from "../../../utils/config/route.config.js";
import {
    Button,
    Chip, CircularProgress, Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import iconConfig from "../../../utils/config/icon.config.jsx";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import { apiUrl } from "../../../utils/config/api.config.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import toastConfig from "../../../utils/config/toast.config.js";
import classNames from "classnames";
import { adminVoucherTableColumns } from "../../../utils/dataDefault/tableColumns.js";

VoucherIndex.propTypes = {};

function VoucherIndex(props) {

    const toastUpdateStatus = useRef(null);

    const axiosServer = useAxiosServer();

    const navigate = useNavigate();

    const activeStatus = [
        {
            label: "Hoạt động",
            value: "true",
            color: "success"
        },
        {
            label: "Vô hiệu hóa",
            value: "false",
            color: "danger"
        }
    ];

    const [listVouchers, setListVouchers] = useState([]);
    const [fetchState, setFetchState] = useState(false);

    const getListVouchers = () => {
        axiosServer.get(apiUrl.voucher.getAll)
            .then((response) => response.data)
            .then((response) => {
                setListVouchers(response.data);
                setFetchState(true);
            });
    };

    const onChangeStatus = (voucherId, status) => {
        toastUpdateStatus.current = toast.info("Updating", toastConfig.loading);
        return axiosServer.put(apiUrl.voucher.activation(voucherId), {
            isActive: status
        }).then((response) => {
            if (response.data.status === "success") {
                getListVouchers();
                toast.update(toastUpdateStatus.current, toastConfig.success(response.data.message));
            }
        }).catch((error) => {
            const { response } = error;
            toast.update(toastUpdateStatus.current, toastConfig.error(response.data.message));
        });
    };

    const handleNavigateToEdit = (voucherId) => {
        return navigate(adminUrl.voucher.edit(voucherId));
    };

    useEffect(() => {
        getListVouchers();
    }, []);

    return (
        <div className={"w-full max-w-7xl flex flex-col gap-4"}>
            <TabHeader tabTitle={"Quản lí Mã giảm giá"} buttonData={{
                icon: iconConfig.add.large,
                label: "Tạo mã giảm giá",
                color: "secondary",
                urlBack: adminUrl.voucher.new
            }}/>
            <div className={"w-full"}>
                <Table aria-label={"List voucher"}>
                    <TableHeader columns={adminVoucherTableColumns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={listVouchers}
                               emptyContent={!fetchState ?
                                   <div className={"w-full flex justify-center items-center"}>
                                       <CircularProgress/>
                                   </div> : "No rows to display"}
                    >
                        {(item) => <TableRow key={item._id}>
                            <TableCell>
                                {item.voucherCode}
                            </TableCell>
                            <TableCell>
                                {item.usedCount}/{item.maxUsage}
                            </TableCell>
                            <TableCell>
                                <Chip color={classNames({
                                    "primary": item.type === "shipping",
                                    "secondary": item.type === "billing"
                                })} variant={"flat"}>
                                    {item.type}

                                </Chip>
                            </TableCell>
                            <TableCell>
                                <Select items={activeStatus}
                                        selectedKeys={[`${item.isActive}`]}
                                        renderValue={([item]) => (
                                            <Chip color={item.data.color}
                                                  variant={"flat"}
                                                  radius={"sm"}
                                            >
                                                {item.data.label}
                                            </Chip>
                                        )}
                                        onSelectionChange={(event) => {
                                            onChangeStatus(item._id, event.currentKey);
                                        }}
                                        disallowEmptySelection
                                        aria-label="Select activation status"
                                >
                                    {(status) => {
                                        return <SelectItem key={status.value}>
                                            <Chip color={status.color} variant={"flat"}>{status.label}</Chip>
                                        </SelectItem>;
                                    }}
                                </Select>
                            </TableCell>
                            <TableCell>
                                <div className={"flex items-center gap-2"}>
                                    <Button color={"primary"}
                                            variant={"ghost"}
                                            isIconOnly
                                            onClick={() => handleNavigateToEdit(item._id)}
                                    >
                                        {iconConfig.detail.large}
                                    </Button>
                                    <Button color={"warning"}
                                            variant={"ghost"}
                                            isIconOnly
                                            onClick={() => handleNavigateToEdit(item._id)}
                                    >
                                        {iconConfig.edit.large}
                                    </Button>
                                    <Button color={"danger"}
                                            variant={"ghost"}
                                            isIconOnly

                                    >
                                        {iconConfig.delete.large}
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default VoucherIndex;