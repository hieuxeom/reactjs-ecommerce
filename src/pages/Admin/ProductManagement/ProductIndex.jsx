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
import useAxios from "../../../hooks/useAxios.js";
import { adminUrl } from "../../../utils/config/route.config.js";
import classNames from "classnames";
import { toast } from "react-toastify";
import toastConfig from "../../../utils/config/toast.config.js";
import iconConfig from "../../../utils/config/icon.config.jsx";
import { adminProductTableColumns } from "../../../utils/dataDefault/tableColumns.js";

function ProductIndex(props) {
    const toastDelete = useRef(null);
    const toastUpdateStatus = useRef(null);

    const axiosClient = useAxios();
    const axiosServer = useAxiosServer();
    const navigate = useNavigate();

    const [listProducts, setListProducts] = useState([]);
    const [fetchState, setFetchState] = useState(false);

    const onChangeStatus = (productId, isActive) => {
        toastUpdateStatus.current = toast.info("Updating", toastConfig.loading);
        return axiosServer.put(apiUrl.product.activation(productId), {
            isActive
        }).then((response) => {
            if (response.data.status === "success") {
                getListProducts();
                toast.update(toastUpdateStatus.current, toastConfig.success(response.data.message));
            }
        }).catch((error) => {
            const { response } = error;
            toast.update(toastUpdateStatus.current, toastConfig.error(response.data.message));
        });
    };

    const onDelete = (categoryId) => {
        toastDelete.current = toast.info("Deleting", toastConfig.loading);
        return axiosServer.delete(apiUrl.product.delete(categoryId)).then((response) => {
            console.log(response);
            if (response.data.status === "success") {
                getListProducts();
                toast.update(toastDelete.current, toastConfig.success(response.data.message));
            }
        }).catch((error) => {
            const { response } = error;
            toast.update(toastUpdateStatus.current, toastConfig.error(response.data.message));
        });
    };

    const handleNavigateToEdit = (productId) => {
        return navigate(adminUrl.product.edit(productId));
    };
    const handleNavigateToDetails = (productId) => {
        return navigate(adminUrl.product.details(productId));
    };

    const getListProducts = () => {

        axiosClient.get(apiUrl.product.all)
            .then((response) => response.data)
            .then((response) => {
                console.log(response.data);
                setListProducts(response.data);
                setFetchState(true);

            }).catch((error) => {
            const { response } = error;
        });
    };

    useEffect(() => {
        getListProducts();
    }, []);

    return (
        <section className={"w-full max-w-7xl flex flex-col gap-4"}>
            <TabHeader tabTitle={"Quản lí Sản phẩm"} buttonData={
                {
                    color: "primary",
                    label: "Thêm sản phẩm",
                    icon: iconConfig.add.large,
                    urlBack: adminUrl.product.new
                }
            }/>
            <main>
                <Table aria-label="Example table with dynamic content">
                    <TableHeader columns={adminProductTableColumns}>
                        {(col) => {

                            return <TableColumn key={col.value}
                                                className={classNames(classConfig.fontSize.base)}
                            >
                                {col.label}
                            </TableColumn>;
                        }}
                    </TableHeader>
                    <TableBody items={listProducts} aria-label="List products table"
                               emptyContent={!fetchState ?
                                   <div className={"w-full flex justify-center items-center"}>
                                       <CircularProgress/>
                                   </div> : "No rows to display"}>
                        {(item) => {
                            return <TableRow key={item._id}>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{item.productPrice}</TableCell>
                                <TableCell>{item.views}</TableCell>
                                <TableCell>{item.soldCount}</TableCell>
                                <TableCell>
                                    <Switch isSelected={item.isActive}
                                            onValueChange={(event) => onChangeStatus(item._id, event)}>
                                        Hiện
                                    </Switch>
                                </TableCell>
                                <TableCell>
                                    <div className={"flex items-center gap-2"}>
                                        <Button isIconOnly={true}
                                                color={"primary"}
                                                variant={"ghost"}
                                                onClick={() => handleNavigateToDetails(item._id)}
                                        >
                                            {iconConfig.detail.large}
                                        </Button>
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

export default ProductIndex;