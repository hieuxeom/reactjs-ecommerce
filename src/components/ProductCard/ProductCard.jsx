import React, { useState } from "react";
import PropTypes from "prop-types";
import { imageUrl } from "../../utils/config/api.config.js";
import { Image } from "@nextui-org/react";
import classNames from "classnames";
import classConfig from "../../utils/config/class.config.js";
import { useNavigate } from "react-router-dom";
import { userUrl } from "../../utils/config/route.config.js";
import { productDetailsType } from "../../utils/propTypes/productType.js";

ProductCard.propTypes = {
    productData: productDetailsType
};

function ProductCard({ productData }) {

    const navigate = useNavigate();

    const [isHoverState, setIsHoverState] = useState(false);

    const handleNavigateToDetails = () => {
        return navigate(userUrl.product.details(productData._id));
    };

    return (
        <div className={"w-full flex flex-col shadow-custom cursor-pointer"}
             onMouseEnter={() => {
                 setIsHoverState(true);
             }}
             onMouseLeave={() => {
                 setIsHoverState(false);
             }}
             onClick={handleNavigateToDetails}

        >
            <div className={"w-full flex justify-center items-center"}>

                <Image radius={"none"}
                       src={`${imageUrl}${productData.productVariants[0].variantImage}`}
                       className={"w-4/5"}
                       removeWrapper
                />

            </div>
            <div className={classNames("w-full flex flex-col items-center gap-2 p-4", {
                "bg-blue": isHoverState
            })}>
                <p className={classNames(classConfig.fontSize.h6, "font-semibold", {
                    "text-secondary": !isHoverState,
                    "text-white": isHoverState
                })}>
                    {productData.productName}
                </p>
                <p className={classNames(classConfig.fontSize.sub, "italic font-semibold", {
                    "text-blue": !isHoverState,
                    "text-white": isHoverState
                })}>{productData.views} lượt xem - {productData.soldCount} bán</p>
                <p className={classNames(classConfig.fontSize.h6, "font-semibold", {
                    "text-secondary": !isHoverState,
                    "text-white": isHoverState
                })}>
                    {productData.productPrice}
                </p>
            </div>
        </div>
    );
}

export default ProductCard;