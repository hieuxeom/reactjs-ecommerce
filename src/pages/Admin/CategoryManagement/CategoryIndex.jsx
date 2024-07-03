import React, {useEffect, useRef, useState} from "react";
import {apiUrl} from "../../../utils/config/api.config.js";
import {
    Button,
    Chip,
    CircularProgress,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import TabHeader from "../../../components/Tab/TabHeader.jsx";
import {IoMdAdd} from "react-icons/io";
import classConfig from "../../../utils/config/class.config.js";
import {RiEditFill} from "react-icons/ri";
import {AiFillDelete} from "react-icons/ai";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import {useNavigate} from "react-router-dom";
import {adminUrl} from "../../../utils/config/route.config.js";
import useAxios from "../../../hooks/useAxios.js";
import classNames from "classnames";
import {toast} from "react-toastify";
import toastConfig from "../../../utils/config/toast.config.js";
import iconConfig from "../../../utils/config/icon.config.jsx";

function CategoryIndex(props) {
    const [listCategories, setListCategories] = useState([]);
    const [fetchState, setFetchState] = useState(false);

    const toastFetch = useRef(null);
    const toastDelete = useRef(null);
    const toastUpdateStatus = useRef(null);

    const axiosClient = useAxios();
    const axiosServer = useAxiosServer();
    const navigate = useNavigate();

    const tableColumns = [
        {
            label: "Tên danh mục",
            value: "category-name"
        },
        {
            label: "Query params",
            value: "query-params"
        },
        {
            label: "Trạng thái Hoạt động",
            value: "active-status"
        },
        {
            label: "Hành động",
            value: "action"
        }
    ];

    const activeStatus = [
        {
            label: "Hoạt động",
            value: "true",
            color: "success"
        },
        {
            label: "Ẩn",
            value: "false",
            color: "danger"
        }
    ];

    const onChangeStatus = (categoryId, {target}) => {
        toastUpdateStatus.current = toast.info("Updating...", toastConfig.loading);
        return axiosServer.put(apiUrl.category.activation(categoryId), {
            isActive: target.value
        }).then((response) => {

            if (response.data.status === "success") {
                getListCategories();
                toast.update(toastUpdateStatus.current, toastConfig.success("Successfully updated category status"));
            }
        }).catch(({response}) => {
            toast.update(toastUpdateStatus.current, toastConfig.error(response.data.message));
        });
    };

    const onDelete = (categoryId) => {
        toastDelete.current = toast.info("Deleting...", toastConfig.loading);
        return axiosServer.delete(apiUrl.category.delete(categoryId)).then((response) => {
            console.log(response);
            if (response.data.status === "success") {
                getListCategories();
                toast.update(toastDelete.current, toastConfig.success("Successfully deleted category"));
            }
        });
    };

    const handleNavigateToEdit = (categoryId) => {
        return navigate(adminUrl.category.edit(categoryId));
    };

    const getListCategories = () => {
        toastFetch.current = toast.info("Fetching...", toastConfig.loading);

        axiosClient.get(apiUrl.category.all).then((response) => {
            setListCategories(response.data.data);
            setFetchState(true);
            toast.update(toastFetch.current, toastConfig.success("Successfully fetched categories data"));
        });
    };

    useEffect(() => {
        getListCategories();
    }, []);

    return (
        <section className={"w-full max-w-7xl flex flex-col gap-4"}>
            <TabHeader tabTitle={"Quản lí danh mục"} buttonData={
                {
                    color: "primary",
                    label: "Tạo danh mục",
                    icon: iconConfig.add.large,
                    urlBack: adminUrl.category.new
                }
            }/>
            <main>
                <Table aria-label="Example table with dynamic content">
                    <TableHeader columns={tableColumns}>
                        {(col) => {

                            return <TableColumn key={col.value}
                                                className={classNames(classConfig.fontSize.base)}>{col.label}</TableColumn>;
                        }
                        }
                    </TableHeader>
                    <TableBody items={listCategories}
                               aria-label="List categories table"
                               emptyContent={!fetchState ?
                                   <div className={"w-full flex justify-center items-center"}>
                                       <CircularProgress></CircularProgress>
                                   </div> : "No rows to display"}>
                        {(item) => {
                            return <TableRow key={item._id}>
                                <TableCell>{item.categoryName}</TableCell>
                                <TableCell>{item.queryParams}</TableCell>
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
                                            onChange={(event) => {
                                                onChangeStatus(item._id, event);
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
                                        <Button isIconOnly={true}
                                                color={"warning"}
                                                variant={"ghost"}
                                                onClick={() => handleNavigateToEdit(item._id)}
                                        >
                                            {iconConfig.edit.large}
                                        </Button>
                                        <Button isIconOnly={true}
                                                color={"danger"}
                                                variant={"ghost"}
                                                onClick={() => onDelete(item._id)}
                                        >
                                            {iconConfig.delete.large}
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>;
                        }}
                    </TableBody>
                </Table>
            </main>
        </section>

    );
}

export default CategoryIndex;