import React, {useEffect, useState} from "react";
import {apiUrl} from "../../../utils/config/api.config.js";
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
import TabHeader from "../../../components/Tab/TabHeader.jsx";
import {IoMdAdd} from "react-icons/io";
import classConfig from "../../../utils/config/class.config.js";
import {RiEditFill} from "react-icons/ri";
import {AiFillDelete} from "react-icons/ai";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import {useNavigate} from "react-router-dom";
import useAxios from "../../../hooks/useAxios.js";
import {adminUrl} from "../../../utils/config/route.config.js";
import classNames from "classnames";

function ProductIndex(props) {
    const [listProducts, setListProducts] = useState([]);

    const axiosClient = useAxios()
    const axiosServer = useAxiosServer();
    const navigate = useNavigate();

    const tableColumns = [
        {
            label: "Tên sản phẩm",
            value: "product-name"
        },
        {
            label: "Giá sản phẩm",
            value: "range-price"
        },
        {
            label: "Lượt xem",
            value: "views"
        },
        {
            label: "Trạng thái Hoạt động",
            value: "active-status"
        },
        {
            label: "Hành động",
            value: "action"
        }
    ]

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
    ]

    const onChangeStatus = (productId, {target}) => {
        return axiosServer.put(apiUrl.product.activation(productId), {
            isActive: target.value
        }).then((response) => {

            if (response.status === "success") {
                getListProducts();
            }
        })
    }

    const onDelete = (categoryId) => {
        return axiosServer.delete(apiUrl.product.delete(categoryId)).then((response) => {
            console.log(response);
            if (response.status === "success") {
                getListProducts();
            }

        })
    }

    const handleNavigateToEdit = (productId) => {
        return navigate(adminUrl.product.edit(productId))
    }

    const getListProducts = () => {
        axiosClient.get(apiUrl.product.all).then((response) => {
            setListProducts(response.data.data);
        })
    }

    useEffect(() => {
        getListProducts();
    }, []);

    return (
        <section className={"w-full max-w-7xl flex flex-col gap-4"}>
            <TabHeader tabTitle={"Quản lí Sản phẩm"} buttonData={
                {
                    color: "primary",
                    label: "Thêm sản phẩm",
                    icon: <IoMdAdd size={classConfig.icon.large}/>
                }
            }/>
            <main>
                <Table aria-label="Example table with dynamic content">
                    <TableHeader columns={tableColumns}>
                        {(col) => {

                            return <TableColumn key={col.value}
                                                className={classNames(classConfig.text.base)}>{col.label}</TableColumn>
                        }}
                    </TableHeader>
                    <TableBody items={listProducts} aria-label="List products table">
                        {(item) => {
                            return <TableRow key={item._id}>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{item.productPrice}</TableCell>
                                <TableCell>{item.views}</TableCell>
                                <TableCell>
                                    <Select items={activeStatus} selectedKeys={[`${item.isActive}`]}
                                            renderValue={([item]) => {
                                                return <Chip color={item.data.color}
                                                             variant={"flat"}>{item.data.label}</Chip>
                                            }}
                                            onChange={(event) => {
                                                onChangeStatus(item._id, event)
                                            }}
                                            disallowEmptySelection
                                            aria-label="Select activation status"
                                    >
                                        {(status) => {
                                            return <SelectItem key={status.value}>
                                                <Chip color={status.color} variant={"flat"}>{status.label}</Chip>
                                            </SelectItem>
                                        }}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <div className={"flex items-center gap-2"}>
                                        <Button isIconOnly={true} color={"warning"} className={"text-white"}
                                                onClick={() => handleNavigateToEdit(item._id)}
                                        >
                                            <RiEditFill size={classConfig.icon.large}/>
                                        </Button>
                                        <Button isIconOnly={true} color={"danger"} className={"text-white"}
                                                onClick={() => onDelete(item._id)}
                                        >
                                            <AiFillDelete size={classConfig.icon.large}/>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        }}
                    </TableBody>
                </Table>
            </main>
        </section>

    );
}

export default ProductIndex;