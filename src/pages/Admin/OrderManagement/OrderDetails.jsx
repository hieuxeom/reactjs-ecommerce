import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import { apiUrl } from "../../../utils/config/api.config.js";
import OrderItem from "../../../components/Order/OrderItem.jsx";
import classNames from "classnames";
import classConfig from "../../../utils/config/class.config.js";
import {
    Button,
    Chip,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea, useDisclosure
} from "@nextui-org/react";
import CustomerInfoBlock from "./components/CustomerInfoBlock.jsx";
import SummaryOrderBlock from "./components/SummaryOrderBlock.jsx";
import iconConfig from "../../../utils/config/icon.config.jsx";
import { getOrderStatusVariant } from "../../../utils/dataDefault/orderStatus.js";
import TabHeader from "../../../components/Tab/TabHeader.jsx";
import { trimString } from "../../../utils/string.js";
import { adminUrl, userUrl } from "../../../utils/config/route.config.js";

OrderDetails.propTypes = {};

function OrderDetails(props) {

    const axiosServer = useAxiosServer();

    const { orderId } = useParams();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [orderItems, setOrderItems] = useState(null);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [summaryOrder, setSummaryOrder] = useState(null);
    const [explainReason, setExplainReason] = useState("");

    const fetchOrderItems = (orderItems) => {

        const mapFetch = orderItems.map((item) => {
            return new Promise((resolve) => {
                axiosServer.get(apiUrl.product.details(item.productId)).then((response) => {

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

            setOrderItems(response);

        });
    };

    const handleChangeOrderStatus = () => {
        axiosServer.put(apiUrl.order.changeStatus(orderId), {
            orderStatus: getOrderStatusVariant(summaryOrder.orderStatus)?.nextStep
        }).then((response) => {
            console.log(response);
            setSummaryOrder(prevState => ({
                ...prevState,
                orderStatus: getOrderStatusVariant(summaryOrder.orderStatus)?.nextStep
            }));
        });
    };

    const handleCancelOrder = () => {
        axiosServer.put(apiUrl.order.canceled(orderId), {
            explainReason
        }).then(response => {

            setSummaryOrder(prevState => ({
                ...prevState,
                orderStatus: "canceled"
            }));

        });
    };

    useEffect(() => {
        if (orderId) {
            axiosServer.get(apiUrl.order.details(orderId))
                .then(response => response.data)
                .then(response => {
                    console.log(response.data);
                    const {
                        orderItems,
                        customerInfo,
                        totalPrice,
                        subTotalPrice,
                        reducedFee,
                        shippingFee,
                        orderStatus,
                        voucherCode,
                        explainReason
                    } = response.data;
                    fetchOrderItems(orderItems);
                    setCustomerInfo(customerInfo);
                    setSummaryOrder({
                        totalPrice, subTotalPrice, reducedFee, shippingFee, orderStatus, voucherCode
                    });
                    setExplainReason(explainReason);
                });
        }
    }, [orderId]);

    useEffect(() => {
        console.log(orderItems);
    }, [orderItems]);

    useEffect(() => {
        console.log(summaryOrder);
    }, [summaryOrder]);

    return (

        <div className={"w-full max-w-7xl flex flex-col gap-4"}>
            <TabHeader tabTitle={`Chi tiết đơn hàng #${trimString(orderId)}`} buttonData={{
                icon: iconConfig.back.base,
                label: "Quay lại",
                color: "secondary",
                urlBack: adminUrl.order.index
            }}/>
            <div className={"w-full max-w-7xl flex gap-8 justify-center"}>
                <div className={"w-1/2 flex flex-col gap-4"}>
                    <CustomerInfoBlock customerInfo={customerInfo}/>
                    <SummaryOrderBlock summaryOrder={summaryOrder}/>
                    <div className={"w-full flex gap-4 shadow-custom p-4 rounded-2xl"}>
                        {summaryOrder?.orderStatus !== "canceled" ?
                            (<>
                                <Button color={"success"}
                                        startContent={iconConfig.confirm.base}
                                        onClick={handleChangeOrderStatus}
                                >
                                    {getOrderStatusVariant(summaryOrder?.orderStatus)?.confirmText}
                                </Button>
                                <Button color={"danger"}
                                        startContent={iconConfig.cancel.base}
                                        onClick={onOpen}
                                >
                                    Hủy đơn hàng
                                </Button>
                            </>) :
                            (<div className={"flex gap-1 items-center"}>
                                <span className={classNames(classConfig.textColor.gray, "italic")}>Đơn hàng đã bị hủy với lí do:</span>
                                <span
                                    className={classNames(classConfig.textColor.danger, "font-semibold")}>{explainReason}</span>
                            </div>)}
                    </div>
                </div>
                <div className={"w-1/2 shadow-custom p-4 rounded-2xl flex flex-col gap-4"}>
                    <div className={"w-full flex justify-between"}>
                        <h5 className={classNames(classConfig.fontSize.h5, classConfig.textColor.secondary)}>
                            Order Items
                        </h5>
                    </div>
                    <div className={"w-full flex flex-col gap-2"}>
                        {orderItems && orderItems.map((item, index) => <OrderItem key={index} itemData={item}/>)}
                    </div>
                </div>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Hủy đơn hàng</ModalHeader>
                                <ModalBody>
                                    <Textarea
                                        autoFocus
                                        label="Lí do hủy đơn"
                                        labelPlacement={"outside"}
                                        variant="bordered"
                                        size={"lg"}
                                        value={explainReason}
                                        onValueChange={setExplainReason}
                                        isRequired
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="flat" onPress={onClose}>
                                        Đóng
                                    </Button>
                                    <Button color="danger" onPress={() => {
                                        handleCancelOrder();
                                        onClose();
                                    }}>
                                        Hủy đơn hàng
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}

export default OrderDetails;


