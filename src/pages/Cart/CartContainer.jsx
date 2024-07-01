import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {CartItemPropTypes} from "../../utils/propTypes/userType.js";
import classNames from "classnames";
import classConfig from "../../utils/config/class.config.js";
import CartItem from "./CartItem.jsx";

CartContainer.propTypes = {
    cartItems: PropTypes.arrayOf(CartItemPropTypes).isRequired,
    onChangeEvent: PropTypes.func.isRequired
};

function CartContainer({cartItems, onChangeEvent}) {

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);
    
    return (
        <div className={"w-full flex flex-col gap-4 p-4"}>

            <div className={"w-full grid grid-cols-12 items-center"}>
                <div className={"col-span-1"}>
                </div>
                <div
                    className={classNames(classConfig.fontSize.h5, classConfig.textColor.secondary, "col-span-4 flex justify-center")}
                >
                    Tên sản phẩm
                </div>
                <div
                    className={classNames(classConfig.fontSize.h5, classConfig.textColor.secondary, "col-span-2 flex justify-center")}
                >
                    Giá
                </div>
                <div
                    className={classNames(classConfig.fontSize.h5, classConfig.textColor.secondary, "col-span-3 flex justify-center")}
                >
                    Số lượng
                </div>
                <div
                    className={classNames(classConfig.fontSize.h5, classConfig.textColor.secondary, "col-span-2 flex justify-center")}
                >
                    Tạm tính
                </div>
            </div>
            {cartItems && cartItems.map((item, index) => {
                return <CartItem key={index} itemData={item} onChangeEvent={onChangeEvent}/>;
            })}
        </div>
    );
}

export default CartContainer;