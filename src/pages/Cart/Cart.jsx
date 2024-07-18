import React, { useEffect, useRef, useState } from "react";
import TabHeader from "../../components/Tab/TabHeader.jsx";
import useAxiosServer from "../../hooks/useAxiosServer.js";
import { apiUrl } from "../../utils/config/api.config.js";
import { Button } from "@nextui-org/react";
import CartContainer from "./CartContainer.jsx";
import CartSummary from "./CartSummary.jsx";
import { FaRotateLeft } from "react-icons/fa6";
import toastConfig from "../../utils/config/toast.config.js";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios.js";
import { useNavigate } from "react-router-dom";
import { userUrl } from "../../utils/config/route.config.js";
import classConfig from "../../utils/config/class.config.js";

Cart.propTypes = {};

function Cart({ children }) {

    const toastReset = useRef(null);

    const axiosClient = useAxios();
    const axiosServer = useAxiosServer();
    const navigate = useNavigate();

    const [userCart, setUserCart] = useState(null);
    const [isHaveChangeEvent, setIsHaveChangeEvent] = useState(false);
    const [listProductDetails, setListProductDetails] = useState(null);

    const [summaryData, setSummaryData] = useState({
        subTotalPrice: 0,
        voucherCode: "",
        shippingFee: 2,
        reducedFee: 0
    });

    const getUserCart = () => {
        axiosServer.get(apiUrl.user.cart)
            .then((response) => response.data)
            .then((response) => {

                setUserCart(response.data);
                setListProductDetails(response.data.cartItems);
                setSummaryData(prevState => ({
                    ...summaryData,
                    subTotalPrice: response.data.subTotalPrice
                }));
            })
        ;
    };

    const handleResetCart = () => {
        toastReset.current = toast.info("Reset...", toastConfig.loading);
        axiosServer.delete(apiUrl.cart.reset).then((response) => {
            if (response.data.status === "success") {
                toast.update(toastReset.current, toastConfig.success("successfully reset cart"));
                navigate(userUrl.cart.base);
            }
        });
    };

    const handleCheckOut = () => {

        const checkoutData = {
            cartItems: userCart.cartItems.map((item) => ({
                ...item,
                productId: item.productId,
                variantKey: item.variantKey,
                quantity: item.quantity,
                priceAtBuy: item.productPrice.discountPrice
            })),
            ...summaryData
        };

        localStorage.setItem("tempCart", JSON.stringify(checkoutData));

        return navigate(userUrl.cart.checkout);
    };

    const handleVoucherCode = (voucherCode) => {
        axiosServer.get(apiUrl.voucher.details(voucherCode)).then(response => {
            const voucherDetails = response.data.data;

            const handleShippingType = () => {
                const newShippingFee = 2 * (100 - voucherDetails.discountPercents) / 100;
                setSummaryData(prevState => ({
                    ...prevState,
                    voucherCode,
                    reducedFee: 0,
                    shippingFee: newShippingFee
                }));
            };

            const handleBillingType = () => {
                const newReducedFee = summaryData.subTotalPrice * voucherDetails.discountPercents / 100;
                setSummaryData(prevState => ({
                    ...prevState,
                    voucherCode,
                    shippingFee: 2,
                    reducedFee: newReducedFee
                }));
            };

            switch (voucherDetails.type) {
                case "shipping":
                    handleShippingType();
                    break;
                case "billing":
                    handleBillingType();
                    break;
                default:
                    setSummaryData(prevState => ({
                        ...prevState,
                        voucherCode,
                        shippingFee: 2,
                        reducedFee: 0
                    }));
                    break;
            }

            setSummaryData(prevState => ({
                ...prevState,
                totalPrice: prevState.subTotalPrice + prevState.shippingFee - prevState.reducedFee
            }));
        });
    };

    useEffect(() => {
        if (userCart) {
            const { voucherCode } = userCart;
            handleVoucherCode(voucherCode);
        }
    }, [userCart]);

    useEffect(() => {
        if (isHaveChangeEvent) {
            getUserCart();
        }
        setIsHaveChangeEvent(false);
    }, [isHaveChangeEvent]);

    useEffect(() => {
        getUserCart();
    }, []);

    useEffect(() => {

    }, [summaryData]);

    return (
        <div className="w-full max-w-7xl mt-8 flex flex-col gap-6">
            <div className={"flex justify-between items-center"}>
                <TabHeader tabTitle={"Giỏ hàng của tôi"}/>
                <Button startContent={<FaRotateLeft/>}
                        color={"danger"}
                        onClick={handleResetCart}
                >
                    Đặt lại giỏ hàng
                </Button>
            </div>
            <section className={"grid grid-cols-12"}>
                <div className={"col-span-8"}>
                    <CartContainer onChangeEvent={setIsHaveChangeEvent}
                                   cartItems={listProductDetails ?? []}/>
                </div>
                <div className={"col-span-4 flex flex-col gap-4"}>
                    <CartSummary summaryData={summaryData} onApplyVoucher={setIsHaveChangeEvent}/>
                    <Button fullWidth size={"lg"}
                            color={"primary"}
                            onClick={handleCheckOut}
                            isDisabled={userCart?.cartItems?.length < 1}
                    >Thanh toán</Button>
                </div>
            </section>
        </div>
    );
}

export default Cart;

