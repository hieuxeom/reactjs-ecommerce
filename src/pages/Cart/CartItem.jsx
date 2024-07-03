import React, {useEffect, useState} from "react";
import {CartItemPropTypes} from "../../utils/propTypes/userType.js";
import PropTypes from "prop-types";
import useAxiosServer from "../../hooks/useAxiosServer.js";
import {Button, ButtonGroup, Image} from "@nextui-org/react";
import {apiUrl, imageUrl} from "../../utils/config/api.config.js";
import classNames from "classnames";
import classConfig from "../../utils/config/class.config.js";
import {IoAdd, IoRemove} from "react-icons/io5";
import CartItemPrice from "./CartItemPrice.jsx";
import iconConfig from "../../utils/config/icon.config.jsx";

CartItem.propTypes = {
    itemData: CartItemPropTypes.isRequired,
    onChangeEvent: PropTypes.func
};

function CartItem({itemData, onChangeEvent}) {
    const axiosServer = useAxiosServer();

    const [quantity, setQuantity] = useState(0);
    const [variantData, setVariantData] = useState(null);
    const [productDetails, setProductDetails] = useState(null);
    useEffect(() => {
        if (itemData) {
            const {quantity, variantKey, productDetails} = itemData;
            setVariantData(productDetails.productVariants.find((item) => item.variantKey === variantKey));
            setProductDetails(productDetails);
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
    };

    const handleUpdateNewQuantity = () => {
        return axiosServer.put(apiUrl.user.cart, {
            productId: productDetails._id,
            newQuantity: quantity,
            variantKey: variantData.variantKey
        }).then((response) => {
            if (response.data.status === "success") {
                onChangeEvent(true);
            }
        });
    };

    useEffect(() => {
        if (productDetails && variantData) {
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
                        <p className={classNames(classConfig.fontSize.h6)}>{productDetails.productName}</p>
                        <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray, "italic")}>{variantData.variantLabel}</p>
                    </div>
                    <CartItemPrice originalPrice={variantData.variantPrice.originalPrice}
                                   discountPrice={variantData.variantPrice.discountPrice}
                                   isDiscount={productDetails.isDiscount}/>
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
                        <CartItemPrice originalPrice={variantData.variantPrice.originalPrice * quantity}
                                       discountPrice={variantData.variantPrice.discountPrice * quantity}
                                       isDiscount={productDetails.isDiscount}/>
                    </div>
                </div>
            }
        </>
    );
}

export default CartItem;