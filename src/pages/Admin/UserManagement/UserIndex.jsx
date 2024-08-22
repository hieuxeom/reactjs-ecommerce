import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import TabHeader from "../../../components/Tab/TabHeader.jsx";
import {
    Button,
    Chip,
    CircularProgress, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow, Textarea, useDisclosure
} from "@nextui-org/react";
import { adminUserTableColumns } from "../../../utils/dataDefault/tableColumns.js";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import axios from "axios";
import { apiUrl } from "../../../utils/config/api.config.js";
import { trimString } from "../../../utils/string.js";
import iconConfig from "../../../utils/config/icon.config.jsx";
import { toast } from "react-toastify";
import toastConfig from "../../../utils/config/toast.config.js";
import { useNavigate } from "react-router-dom";
import { adminUrl } from "../../../utils/config/route.config.js";

UserIndex.propTypes = {};

function UserIndex(props) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const axiosServer = useAxiosServer();
    const navigate = useNavigate();

    const [listUsers, setListUsers] = useState([]);
    const [fetchState, setFetchState] = useState(false);

    const navigateToBlock = (userId) => {
        return navigate(adminUrl.user.block(userId));
    };

    const navigateToUnBlock = (userId) => {
        return navigate(adminUrl.user.unBlock(userId));
    };

    const navigateToProfile = (userId) => {
        return navigate(adminUrl.user.profile(userId));
    };

    const getListUsers = () => {
        return axiosServer.get(apiUrl.user.all)
            .then((response) => response.data)
            .then((response) => {
                setListUsers(response.data);
                setFetchState(true);
            })
            .catch((error) => {
                const { response } = error;
                console.log(response);
            });
    };

    useEffect(() => {
        getListUsers();
    }, []);

    useEffect(() => {
        console.log(listUsers);
    }, [listUsers]);

    return (
        <div className={"w-full max-w-7xl flex flex-col gap-4"}>
            <TabHeader tabTitle={"Danh sách khách hàng"}/>
            <div className={"w-full"}>
                {listUsers && <Table aria-label={"List of users"}>
                    <TableHeader columns={adminUserTableColumns}>
                        {
                            (col) => <TableColumn key={col.key}>{col.label}</TableColumn>
                        }
                    </TableHeader>
                    <TableBody items={listUsers}
                               emptyContent={!fetchState ?
                                   <div className={"w-full flex justify-center items-center"}>
                                       <CircularProgress></CircularProgress>
                                   </div> : "No rows to display"}
                    >
                        {(user) => <TableRow key={user._id}>
                            <TableCell>{trimString(user._id)}</TableCell>
                            <TableCell>{user.userName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {user.role === 1
                                    ? <Chip color={"danger"} variant={"flat"}>Admin</Chip>
                                    : <Chip color={"success"} variant={"flat"}>Member</Chip>
                                }
                            </TableCell>
                            <TableCell>{user.isActive
                                ? <Chip color={"success"} variant={"flat"}>Hoạt động</Chip>
                                : <Chip color={"danger"} variant={"flat"}>Bị khóa</Chip>
                            }</TableCell>
                            <TableCell>
                                <div className={"flex items-center gap-1"}>
                                    <Button isIconOnly
                                            color={"primary"}
                                            variant={"ghost"}
                                            onClick={() => navigateToProfile(user._id)}
                                    >
                                        {iconConfig.detail.large}
                                    </Button>
                                    {user.isActive
                                        ? <Button isIconOnly
                                                  color={"danger"}
                                                  onClick={() => navigateToBlock(user._id)}
                                        >
                                            {iconConfig.block.large}
                                        </Button>
                                        : <Button isIconOnly
                                                  color={"success"}
                                                  onClick={() => navigateToUnBlock(user._id)}
                                        >
                                            {iconConfig.unBlock.large}
                                        </Button>
                                    }
                                </div>
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>}
            </div>
        </div>
    );
}

export default UserIndex;