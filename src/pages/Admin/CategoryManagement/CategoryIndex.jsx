import React, { useEffect, useRef, useState } from "react";
import { apiUrl } from "../../../utils/config/api.config.js";
import {
    Button,
    CircularProgress,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import TabHeader from "../../../components/Tab/TabHeader.jsx";
import classConfig from "../../../utils/config/class.config.js";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import { useNavigate } from "react-router-dom";
import { adminUrl } from "../../../utils/config/route.config.js";
import useAxios from "../../../hooks/useAxios.js";
import classNames from "classnames";
import { toast } from "react-toastify";
import toastConfig from "../../../utils/config/toast.config.js";
import iconConfig from "../../../utils/config/icon.config.jsx";
import { adminCategoryTableColumns } from "../../../utils/dataDefault/tableColumns.js";

function CategoryIndex(props) {
    const [listCategories, setListCategories] = useState([]);
    const [fetchState, setFetchState] = useState(false);

    const toastDelete = useRef(null);
    const toastUpdateStatus = useRef(null);

    const axiosServer = useAxiosServer();
    const navigate = useNavigate();

    const onChangeStatus = (categoryId, isActive) => {

        toastUpdateStatus.current = toast.info("Updating...", toastConfig.loading);
        axiosServer.put(apiUrl.category.activation(categoryId), {
            isActive
        })
            .then((response) => response.data)
            .then((response) => {
                getListCategories();
                toast.update(toastUpdateStatus.current, toastConfig.success("Successfully updated category status"));
            }).catch((error) => {
            const { response } = error;
            toast.update(toastUpdateStatus.current, toastConfig.error(response.data.message));
        });
    };

    const onDelete = (categoryId) => {
        toastDelete.current = toast.info("Deleting...", toastConfig.loading);
        return axiosServer.delete(apiUrl.category.delete(categoryId))
            .then((response) => response.data)
            .then((response) => {
                if (response.status === "success") {
                    getListCategories();
                    toast.update(toastDelete.current, toastConfig.success("Successfully deleted category"));
                }
            });
    };

    const handleNavigateToEdit = (categoryId) => {
        return navigate(adminUrl.category.edit(categoryId));
    };

    const getListCategories = () => {
        axiosServer.get(apiUrl.category.all)
            .then((response) => response.data)
            .then((response) => {
                setListCategories(response.data);
                setFetchState(true);
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
                    <TableHeader columns={adminCategoryTableColumns}>
                        {
                            (col) =>
                                <TableColumn key={col.value}
                                             className={classNames(classConfig.fontSize.base)}
                                >
                                    {col.label}
                                </TableColumn>
                        }
                    </TableHeader>

                    <TableBody items={listCategories}
                               aria-label="List categories table"
                               emptyContent={!fetchState ?
                                   <div className={"w-full flex justify-center items-center"}>
                                       <CircularProgress/>
                                   </div> : "No rows to display"}>
                        {(item) => {
                            return <TableRow key={item._id}>
                                <TableCell>{item.categoryName}</TableCell>
                                <TableCell>{item.queryParams}</TableCell>
                                <TableCell>
                                    <Switch isSelected={item.isActive}
                                            onValueChange={(event) => onChangeStatus(item._id, event)}>
                                        Kích hoạt
                                    </Switch>
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