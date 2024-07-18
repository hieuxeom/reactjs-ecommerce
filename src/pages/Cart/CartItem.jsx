import React, { useEffect, useState } from "react";
import { CartItemPropTypes } from "../../utils/propTypes/userType.js";
import PropTypes from "prop-types";
import useAxiosServer from "../../hooks/useAxiosServer.js";
import { Button, ButtonGroup, Image } from "@nextui-org/react";
import { apiUrl, imageUrl } from "../../utils/config/api.config.js";
import classNames from "classnames";
import classConfig from "../../utils/config/class.config.js";

import CartItemPrice from "./CartItemPrice.jsx";
import iconConfig from "../../utils/config/icon.config.jsx";
import { useNavigate } from "react-router-dom";
import { userUrl } from "../../utils/config/route.config.js";

CartItem.propTypes = {
    itemData: CartItemPropTypes.isRequired,
    onChangeEvent: PropTypes.func
};

function CartItem({ itemData, onChangeEvent }) {
    const axiosServer = useAxiosServer();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(0);
    const [variantData, setVariantData] = useState("-");
    const [productPrice, setProductPrice] = useState({
        originalPrice: 0,
        discountPrice: 0
    });
    const [productName, setProductName] = useState("");
    useEffect(() => {
        if (itemData) {
            const { quantity, productVariant, productName, productPrice } = itemData;
            setVariantData(productVariant);
            setProductName(productName);
            setProductPrice(productPrice);
            setQuantity(quantity);
        }
    }, [itemData]);

    const handleIncreaseQuantity = () => {

        if (quantity < variantData.variantStock) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }

        if (quantity === 1) {
            if (confirm("Xóa sản phẩm?")) {
                return axiosServer.put(apiUrl.cart.delete, {
                    productId: itemData.productId,
                    productVariant: itemData.variantKey
                }).then((response) => {
                    console.log(response);
                    return onChangeEvent(true);
                });
            }
        }
    };

    const handleUpdateNewQuantity = () => {
        return axiosServer.put(apiUrl.user.cart, {
            productId: itemData.productId,
            newQuantity: quantity,
            variantKey: variantData.variantKey
        }).then((response) => {
            if (response.data.status === "success") {
                onChangeEvent(true);
            }
        });
    };

    useEffect(() => {
        if (productPrice && variantData) {
            handleUpdateNewQuantity();
        }
    }, [quantity]);

    return (
        <>
            {itemData && variantData &&
                <div className={"w-full grid grid-cols-12 items-center"}>
                    <div className={"col-span-1"}>
                        <Image src={`${imageUrl}${variantData.variantImage}`}/>
                    </div>
                    <div className={"col-span-4 flex flex-col justify-center items-center"}>
                        <p className={classNames(classConfig.fontSize.h6)}>{productName}</p>
                        <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray, "italic")}>{variantData.variantLabel}</p>
                    </div>
                    <CartItemPrice originalPrice={productPrice.originalPrice}
                                   discountPrice={productPrice.discountPrice}
                                   isDiscount={productPrice.originalPrice !== productPrice.discountPrice}/>
                    <div className={"col-span-3 flex justify-center"}>
                        <ButtonGroup className={"w-max"}>
                            <Button isIconOnly onClick={handleDecreaseQuantity}>
                                {iconConfig.minus.base}
                            </Button>
                            <Button variant={"flat"}>{quantity}</Button>
                            <Button isIconOnly onClick={handleIncreaseQuantity}>
                                {iconConfig.add.base}
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div className={"col-span-2 flex justify-center"}>
                        <CartItemPrice originalPrice={productPrice.originalPrice * quantity}
                                       discountPrice={productPrice.discountPrice * quantity}
                                       isDiscount={productPrice.originalPrice !== productPrice.discountPrice}/>
                    </div>
                </div>
            }
        </>
    );
}

export default CartItem;