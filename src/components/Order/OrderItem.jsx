import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, Textarea,
    useDisclosure
} from "@nextui-org/react";
import { apiUrl, imageUrl } from "../../utils/config/api.config.js";
import classNames from "classnames";
import classConfig from "../../utils/config/class.config.js";
import { productVariantType } from "../../utils/propTypes/productType.js";
import iconConfig from "../../utils/config/icon.config.jsx";
import StarRating from "../StarRating/StarRating.jsx";
import { useParams } from "react-router-dom";
import useAxiosServer from "../../hooks/useAxiosServer.js";

OrderItem.propTypes = {
    itemData: PropTypes.shape(
        {
            productId: PropTypes.string,
            variantKey: PropTypes.string,
            quantity: PropTypes.number,
            _id: PropTypes.string,
            productName: PropTypes.string,
            productVariant: productVariantType,
            priceAtBuy: PropTypes.number,
            isReview: PropTypes.bool
        }
    ),
    isHaveReviewButton: PropTypes.bool
};

function OrderItem({ itemData, isHaveReviewButton }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { orderId } = useParams();

    const axiosServer = useAxiosServer();
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [productVariant, setProductVariant] = useState(null);
    const [price, setPrice] = useState(0);

    const [reviewContent, setReviewContent] = useState("");
    const [reviewStar, setReviewStar] = useState(5);
    const [isReview, setIsReview] = useState(itemData?.isReview ?? false);

    const handleReview = () => {
        console.log(orderId);
        const reviewData = {
            orderId,
            reviewContent,
            reviewStar,
            variantKey: itemData.variantKey
        };

        console.log(reviewData);
        axiosServer.post(apiUrl.product.reviews(itemData.productId), reviewData).then((response) => {
            setIsReview(true);
        });
    };

    useEffect(() => {
        if (itemData) {
            setProductVariant(itemData.productVariant);
            setProductName(itemData.productName);
            setQuantity(itemData.quantity);
            setPrice(itemData.priceAtBuy);
            console.log(itemData);
        }
    }, [itemData]);
    return (
        <>
            {itemData &&
                <>
                    <div className={"w-full flex items-center gap-8"}>
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
                            <p className={classNames(classConfig.fontSize.h6, classConfig.textColor.red)}>{(price * quantity).toFixed(2)}$</p>
                        </div>
                        {
                            isHaveReviewButton &&
                            <Button isIconOnly
                                    variant={classNames({
                                        "ghost": !isReview,
                                        "solid": isReview
                                    })}
                                    color={"warning"}
                                    className={classNames({
                                        "pointer-events-none": isReview
                                    })}
                                    onClick={onOpen}
                            >
                                {iconConfig.star.base}
                            </Button>
                        }
                    </div>
                    <Modal isOpen={isOpen}
                           onOpenChange={onOpenChange}
                           size={"2xl"}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex items-center gap-2">
                                        Đánh giá cho sản phẩm
                                        <span className={"text-secondary underline italic"}>
                                            {itemData.productName} - {itemData.variantKey}
                                        </span>
                                    </ModalHeader>
                                    <ModalBody>
                                        <div className={"flex flex-col gap-4 items-center"}>
                                            <StarRating rating={reviewStar} allowChange={true}
                                                        onRatingChange={setReviewStar}/>
                                            <Textarea value={reviewContent}
                                                      onValueChange={setReviewContent}
                                                      placeholder={"Nội dung đánh giá"}
                                            />
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button color="primary" onPress={() => {
                                            handleReview();
                                            onClose();
                                        }}>
                                            Đánh giá
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            }
        </>
    );
}

export default OrderItem;