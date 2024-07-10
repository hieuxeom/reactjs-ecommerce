import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { productReviewType } from "../../../utils/propTypes/productType.js";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import StarRating from "../../../components/StarRating/StarRating.jsx";
import classNames from "classnames";
import classConfig from "../../../utils/config/class.config.js";
import ReviewBlock from "./components/ReviewBlock.jsx";

ReviewsSection.propTypes = {
    listReview: PropTypes.arrayOf(productReviewType)
};

function ReviewsSection({ listReview }) {
    useEffect(() => {
        console.log(listReview);
    }, [listReview]);

    return (
        <div className={"bg-white shadow-custom p-4 flex flex-col gap-4"}>
            <h5 className={classNames(classConfig.fontSize.h5)}>Đánh giá</h5>
            <div className={"grid grid-cols-3 gap-4"}>
                {listReview?.length > 0 ?
                    listReview.map(({ userName, variantKey, reviewStar, reviewContent, createdAt }, index) =>
                        <ReviewBlock
                            key={index}
                            variantKey={variantKey}
                            userName={userName}
                            reviewStar={reviewStar}
                            createdAt={createdAt}
                            reviewContent={reviewContent}
                        />) :
                    <p className={"italic"}>Chưa có đánh giá nào cho sản phẩm này</p>}
            </div>
        </div>
    );
}

export default ReviewsSection;