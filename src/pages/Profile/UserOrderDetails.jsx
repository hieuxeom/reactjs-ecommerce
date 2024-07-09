import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosServer from "../../hooks/useAxiosServer.js";
import { useParams } from "react-router-dom";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure
} from "@nextui-org/react";
import { apiUrl } from "../../utils/config/api.config.js";
import { getOrderStatusVariant } from "../../utils/dataDefault/orderStatus.js";
import CustomerInfoBlock from "../Admin/OrderManagement/components/CustomerInfoBlock.jsx";
import SummaryOrderBlock from "../Admin/OrderManagement/components/SummaryOrderBlock.jsx";
import iconConfig from "../../utils/config/icon.config.jsx";
import classNames from "classnames";
import classConfig from "../../utils/config/class.config.js";
import OrderItem from "../../components/Order/OrderItem.jsx";
import TabHeader from "../../components/Tab/TabHeader.jsx";
import { userUrl } from "../../utils/config/route.config.js";

UserOrderDetails.propTypes = {};

function UserOrderDetails(props) {
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

    const handleReturnOrder = () => {
        axiosServer.put(apiUrl.order.returned(orderId), {
            explainReason
        }).then(response => {
            setSummaryOrder(prevState => ({
                ...prevState,
                orderStatus: "returned"
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
        <div className={"w-full max-w-7xl flex flex-col mt-8 gap-4 justify-center"}>
            <TabHeader tabTitle={"Thông tin đơn hàng"} buttonData={{
                icon: iconConfig.back.base,
                label: "Quay lại",
                color: "secondary",
                urlBack: userUrl.profile.me
            }}/>
            <div className={"flex gap-8"}>
                <div className={"w-1/2 flex flex-col gap-4"}>
                    <CustomerInfoBlock customerInfo={customerInfo}/>
                    <SummaryOrderBlock summaryOrder={summaryOrder}/>
                    <div className={"w-full flex gap-4 shadow-custom p-4 rounded-2xl"}>
                        {summaryOrder?.orderStatus === "waiting" &&
                            (<>
                                <Button color={"danger"}
                                        startContent={iconConfig.cancel.base}
                                        onClick={onOpen}
                                >
                                    Hủy đơn hàng
                                </Button>
                            </>)}

                        <Button color={"primary"}
                                startContent={iconConfig.cancel.base}
                                onClick={onOpen}
                                isDisabled={summaryOrder?.orderStatus !== "completed"}
                        >
                            Hoàn/Trả đơn hàng
                        </Button>

                        {["canceled", "returned"].includes(summaryOrder?.orderStatus) && (
                            <div className={"flex gap-1 items-center"}>
                        <span
                            className={classNames(classConfig.textColor.gray, "italic")}>Đơn hàng đã bị {summaryOrder?.orderStatus === "canceled" ? "hủy" : "hoàn/trả"} với lí do:
                        </span>
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
                                <ModalHeader className="flex flex-col gap-1">Lí do</ModalHeader>
                                <ModalBody>
                                    <Textarea
                                        autoFocus
                                        label="Lí do"
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
                                    {
                                        summaryOrder?.orderStatus === "waiting" ?
                                            <Button color="danger" onPress={() => {
                                                handleCancelOrder();
                                                onClose();
                                            }}>
                                                Hủy đơn hàng
                                            </Button> : <Button color="primary" onPress={() => {
                                                handleReturnOrder();
                                                onClose();
                                            }}>
                                                Hoàn/Trả đơn hàng
                                            </Button>
                                    }
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    )
        ;
}

export default UserOrderDetails;