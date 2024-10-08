import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Image } from "@nextui-org/react";
import { apiUrl, imageUrl } from "../../../utils/config/api.config.js";
import classNames from "classnames";
import classConfig from "../../../utils/config/class.config.js";
import { IoAdd, IoRemove } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa6";
import StarRating from "../../../components/StarRating/StarRating.jsx";
import { productDetailsType } from "../../../utils/propTypes/productType.js";
import toastConfig from "../../../utils/config/toast.config.js";
import { toast } from "react-toastify";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import iconConfig from "../../../utils/config/icon.config.jsx";

DetailsSection.propTypes = {
    productDetails: productDetailsType
};

function DetailsSection({ productDetails }) {

    const axiosServer = useAxiosServer();

    const toastAdd = useRef(null);

    const [currentImage, setCurrentImage] = useState(null);
    const [currentVariantPrice, setCurrentVariantPrice] = useState(0);
    const [currentVariantStock, setCurrentVariantStock] = useState(0);
    const [currentVariantKey, setCurrentVariantKey] = useState("");
    const [countQuantity, setCountQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(0);

    const handleIncreaseQuantity = () => {
        if (countQuantity < currentVariantStock) {
            setCountQuantity(prev => prev + 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (countQuantity > 1) {
            setCountQuantity(prev => prev - 1);
        }
    };

    const handleAddProductToCart = () => {
        toastAdd.current = toast.info("Adding...", toastConfig.loading);
        const postData = {
            productId: productDetails._id,
            variantKey: currentVariantKey,
            quantity: countQuantity
        };
        axiosServer.post(apiUrl.cart.add, postData).then(response => {
            if (response.data.status === "success") {
                toast.update(toastAdd.current, toastConfig.success(response.data.message));
            }
        }).catch((error) => {
            const { response } = error;
            toast.update(toastAdd.current, toastConfig.error(response.data.message));
        });
    };

    useEffect(() => {
        console.log(productDetails.productVariants[selectedVariant].variantImage);
        setCurrentVariantKey(productDetails.productVariants[selectedVariant].variantKey);
        setCurrentImage(productDetails.productVariants[selectedVariant].variantImage);
        setCurrentVariantPrice(productDetails.productVariants[selectedVariant].variantPrice);
        setCurrentVariantStock(productDetails.productVariants[selectedVariant].variantStock);
    }, [selectedVariant]);

    useEffect(() => {
        if (productDetails) {
            setSelectedVariant(0);
        }
    }, [productDetails]);

    return (productDetails && <div className={"w-full flex gap-4 shadow-custom"}>
            <div className={"w-1/2 max-h-[550px] flex items-start"}>
                <div className={"w-1/4 flex flex-col gap-4 p-4"}>
                    {productDetails.productVariants.map((variant, index) => (
                        <div key={index} className={classNames("w-full border-2 rounded-xl", {
                            "border-secondary": index === selectedVariant,
                            "border-secondary/25": index !== selectedVariant
                        })}>
                            <Image src={`${imageUrl}${variant.variantImage}`}/>
                        </div>
                    ))}
                </div>
                <div className={"w-3/4 p-4"}>
                    {currentImage && <Image src={`${imageUrl}${currentImage}`}/>}
                </div>
            </div>
            <div className={"w-1/2 flex flex-col gap-4 p-4"}>
                <h3 className={classNames(classConfig.fontSize.h3, classConfig.textColor.default)}>{productDetails.productName}</h3>
                <div className={"flex items-center gap-2"}>
                    <StarRating rating={productDetails.productRating}/>
                    <div className={"flex items-center gap-2 border-l-1 border-black/10 px-2"}>
                        <span
                            className={classNames(classConfig.fontSize.sub, classConfig.textColor.default, "underline font-semibold")}>{productDetails.soldCount}
                        </span>
                        <p>Đã bán</p>
                    </div>
                    <div className={"flex items-center gap-2 border-l-1 border-black/10 px-2"}>
                        <span
                            className={classNames(classConfig.fontSize.sub, classConfig.textColor.default, "underline font-semibold")}>{productDetails.productReviews.length}
                        </span>
                        <p>Đánh giá</p>
                    </div>
                </div>
                <div className={"flex gap-8 items-center"}>
                    <h2 className={classNames(classConfig.fontSize.h2, classConfig.textColor.secondary)}>{currentVariantPrice.discountPrice?.toFixed(2)}$</h2>
                    <h3 className={classNames(classConfig.fontSize.h3, classConfig.textColor.gray, "font-normal line-through")}>{currentVariantPrice.originalPrice?.toFixed(2)}$</h3>
                </div>
                <div className={"flex flex-col gap-2"}>
                    <p className={classNames(classConfig.textColor.default, "font-semibold")}>Loại</p>
                    <div className={"flex items-center gap-4"}>
                        {productDetails.productVariants.map((variant, index) => (
                            <div key={index}
                                 className={classNames("border-2 rounded-xl flex items-center gap-2 px-4 py-1 cursor-pointer", {
                                     "border-black/10": index !== selectedVariant,
                                     "border-secondary": index === selectedVariant
                                 })}
                                 onClick={() => setSelectedVariant(index)}
                            >
                                <Image src={`${imageUrl}${variant.variantImage}`}
                                       className={"max-w-8"}
                                />
                                {variant.variantLabel}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={"flex flex-col gap-2"}>
                    <p className={classNames(classConfig.textColor.default, "font-semibold")}>Số lượng</p>
                    <div className={"flex items-center gap-4"}>
                        <ButtonGroup className={"w-max"}>
                            <Button isIconOnly onClick={handleDecreaseQuantity}>
                                {iconConfig.minus.base}
                            </Button>
                            <Button variant={"flat"}>{countQuantity}</Button>
                            <Button isIconOnly onClick={handleIncreaseQuantity}>
                                {iconConfig.add.base}
                            </Button>
                        </ButtonGroup>
                        <div className={"flex items-center gap-1"}>
                            <span className={classNames(classConfig.textColor.navyBlue, "font-semibold")}>
                                    {currentVariantStock}
                                </span>
                            <p>sản phẩm có sẵn</p>
                        </div>
                    </div>
                </div>
                <div>
                    <Button size={"lg"}
                            color={"secondary"}
                            startContent={<FaCartPlus size={classConfig.icon.base}/>}
                            onClick={handleAddProductToCart}
                    >
                        Thêm vào giỏ hàng
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DetailsSection;