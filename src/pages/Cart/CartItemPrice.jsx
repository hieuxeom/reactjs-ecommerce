import React from "react";
import PropTypes from "prop-types";

CartItemPrice.propTypes = {
    isDiscount: PropTypes.bool.isRequired,
    discountPrice: PropTypes.number.isRequired,
    originalPrice: PropTypes.number.isRequired
};

function CartItemPrice({isDiscount, discountPrice, originalPrice}) {
    return (
        isDiscount ?
            <div className={"col-span-2 flex flex-col items-center justify-center"}>
                <span className={"text-xl font-semibold text-primary"}>
                    {discountPrice.toFixed(2)}$
                </span>
                <span className={"text-md font-semibold text-gray-400 line-through"}>
                    {originalPrice.toFixed(2)}$
                </span>
            </div> :
            <div className={"col-span-2 flex flex-col items-center justify-center"}>
                <span className={"text-xl font-semibold text-primary"}>
                    {discountPrice.toFixed(2)}$
                </span>
            </div>
    )
        ;
}

export default CartItemPrice;