import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Image } from "@nextui-org/react";
import { imageUrl } from "../../utils/config/api.config.js";
import classNames from "classnames";
import classConfig from "../../utils/config/class.config.js";
import { productVariantType } from "../../utils/propTypes/productType.js";

OrderItem.propTypes = {
    itemData: PropTypes.shape(
        {
            productId: PropTypes.string,
            variantKey: PropTypes.string,
            quantity: PropTypes.number,
            _id: PropTypes.string,
            productName: PropTypes.string,
            productVariant: productVariantType
        }
    )
};

function OrderItem({ itemData }) {

    const [productVariant, setProductVariant] = useState(null);
    const [productName, setProductName] = useState(null);
    const [quantity, setQuantity] = useState(null);

    useEffect(() => {
        if (itemData) {
            setProductVariant(itemData.productVariant);
            setProductName(itemData.productName);
            setQuantity(itemData.quantity);
        }
    }, [itemData]);
    return (
        <>
            {itemData && <div className={"w-full flex items-center gap-8"}>
                <Image src={imageUrl + productVariant?.variantImage ?? ""} radius={"sm"}
                       className={"w-16 border-2 border-black/10 rounded-xl"}/>
                <div className={"w-full flex flex-col gap-1"}>
                    <p className={classNames(classConfig.fontSize.h6, classConfig.textColor.default)}>{productName ?? ""}</p>
                    <div className={"flex items-center gap-2"}>
                        <p className={classNames(classConfig.textColor.gray, classConfig.fontSize.sub, "italic")}>{productVariant?.variantLabel ?? ""}</p>
                        <p className={classNames(classConfig.textColor.gray, classConfig.fontSize.sub, "italic")}>-</p>
                        <p className={classNames(classConfig.textColor.gray, classConfig.fontSize.sub, "italic")}>x{quantity ?? 0}</p>
                    </div>
                </div>
                <div>
                    <p className={classNames(classConfig.fontSize.h6, classConfig.textColor.red)}>{((+productVariant?.variantPrice?.discountPrice ?? 0) * quantity).toFixed(2)}$</p>
                </div>
            </div>}
        </>
    );
}

export default OrderItem;