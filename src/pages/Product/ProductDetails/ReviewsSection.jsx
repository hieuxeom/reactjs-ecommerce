import React from "react";
import PropTypes from "prop-types";
import {productReviewType} from "../../../utils/propTypes/productType.js";
import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import StarRating from "../../../components/StarRating/StarRating.jsx";
import classNames from "classnames";
import classConfig from "../../../utils/config/class.config.js";

ReviewsSection.propTypes = {
    listReview: PropTypes.arrayOf(productReviewType)
};

function ReviewsSection({listReview}) {
    return (
        <div className={"bg-white shadow-custom p-4 flex flex-col gap-4"}>
            <h5 className={classNames(classConfig.fontSize.h5)}>Đánh giá</h5>
            <div className={"grid grid-cols-3 gap-4"}>
                <Card className="w-full" radius={"sm"}>
                    <CardHeader className="flex gap-3 justify-between items-start">
                        <div className="flex flex-col">
                            <p className="font-semibold">Tên người đánh giá</p>
                            <StarRating rating={5} showText={false}/>
                        </div>
                        <div className={"text-gray-300"}>
                            12/2/2023
                        </div>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ReviewsSection;