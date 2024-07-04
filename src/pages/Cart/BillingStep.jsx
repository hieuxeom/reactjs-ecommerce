import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import TabHeader from "../../components/Tab/TabHeader.jsx";
import {Accordion, AccordionItem, Avatar, Button, Image} from "@nextui-org/react";
import useAxios from "../../hooks/useAxios.js";
import {apiUrl, imageUrl} from "../../utils/config/api.config.js";

import classNames from "classnames";
import classConfig from "../../utils/config/class.config.js";
import useAxiosServer from "../../hooks/useAxiosServer.js";
import OrderItem from "../../components/Order/OrderItem.jsx";

BillingStep.propTypes = {
    onNextStep: PropTypes.func

};

function BillingStep({onNextStep}) {

    const axiosClient = useAxios();
    const axiosServer = useAxiosServer();

    const [tempCart, setTempCart] = useState(null);
    const [cartItems, setCartItems] = useState(null);
    const [userAddress, setUserAddress] = useState(null);

    const fetchCartItems = () => {
        const {cartItems} = tempCart;

        const mapFetch = cartItems.map((item) => {
            return new Promise((resolve, reject) => {
                axiosClient.get(apiUrl.product.details(item.productId)).then((response) => {

                    if (response.data.status === "success") {
                        const productDetails = response.data.data;
                        const productVariant = productDetails.productVariants.find((variant) => variant.variantKey === item.variantKey);

                        resolve({
                            ...item,
                            productName: productDetails.productName,
                            productVariant
                        });
                    }

                });
            });
        });

        Promise.all(mapFetch).then((response) => {

            setCartItems(response);

        });
    };
    const handleComplete = () => {
        const {cartItems, ...summaryData} = tempCart;
        const orderData = {
            ...summaryData,
            orderItems: cartItems,
            customerInfo: userAddress

        };

        axiosServer.post(apiUrl.order.new, orderData).then((response) => {
            if (response.data.status === "success")
                localStorage.removeItem("tempCart");
            localStorage.removeItem("userAddress");
            onNextStep({
                step: 3
            });
        });
    };

    useEffect(() => {
        const tempCart = localStorage.getItem("tempCart");
        const userAddress = localStorage.getItem("userAddress");

        if (tempCart) {
            setTempCart(JSON.parse(tempCart));
            setUserAddress(JSON.parse(userAddress));
        }
    }, []);

    useEffect(() => {
        if (tempCart) {
            fetchCartItems();
        }
    }, [tempCart]);

    return (
        <div className={"w-full max-w-7xl mt-8 flex flex-col gap-6"}>
            <TabHeader tabTitle={"Hóa đơn"}/>
            <div className={"w-full flex items-center flex-col gap-4 border-black/10"}>
                <div
                    className={"w-3/4 flex flex-col gap-4 px-2 py-2"}
                >
                    <Accordion variant={"splitted"} selectionMode={"multiple"} defaultSelectedKeys={["2"]}>
                        <AccordionItem key="1"
                                       title={`Order Items - ${cartItems?.length ?? 0} item(s)`}
                                       aria-label="Order Items"
                        >
                            <div className={"flex flex-col gap-4"}>
                                <div
                                    className={"w-full flex flex-col gap-4 px-4 py-2 border-1 border-black/10  rounded-2xl"}>

                                    {cartItems && cartItems.map((item, index) => (
                                        <OrderItem key={index} itemData={item}/>
                                    ))}
                                </div>

                                <div className={"w-full flex justify-end items-center gap-2"}>
                                    <p className={classConfig.textColor.default}>Total:</p>
                                    <h5 className={classNames(classConfig.fontSize.h5, classConfig.textColor.primary)}>{tempCart?.totalPrice?.toFixed(2) ?? 0}$</h5>
                                </div>
                            </div>
                        </AccordionItem>
                        <AccordionItem key="2" aria-label={"Shipping Address"} title={"Shipping Address"}>
                            <div className={"w-full flex flex-col gap-4"}>
                                <div className={"w-full flex items-center justify-between"}>
                                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray)}>
                                        Tên người nhận
                                    </p>
                                    <p className={"font-semibold"}>{userAddress?.fullName}</p>
                                </div>
                                <div className={"w-full flex items-center justify-between"}>
                                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray)}>
                                        Số điện thoại
                                    </p>
                                    <p className={"font-semibold"}>{userAddress?.phoneNumber}</p>
                                </div>
                                <div className={"w-full flex items-center justify-between"}>
                                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray)}>
                                        Email
                                    </p>
                                    <p className={"font-semibold"}>{userAddress?.email}</p>
                                </div>
                                <div className={"w-full flex items-center justify-between"}>
                                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray)}>
                                        Địa chỉ giao hàng
                                    </p>
                                    <p className={"font-semibold"}>{userAddress?.fullAddress}</p>
                                </div>
                                <div className={"w-full flex items-center justify-between"}>
                                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray)}>
                                        Phương thức thanh toán
                                    </p>
                                    <p className={"font-semibold"}>Thanh toán khi nhận hàng</p>
                                </div>
                            </div>
                        </AccordionItem>
                    </Accordion>
                    <div className={"flex items-center"}>
                        <Button size={"lg"}
                                fullWidth
                                color={"primary"}
                                onClick={handleComplete}
                        >
                            Đặt hàng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BillingStep;

