import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classConfig from "../../../../utils/config/class.config.js";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import StarRating from "../../../../components/StarRating/StarRating.jsx";
import { formatDate } from "../../../../utils/time.js";

ReviewBlock.propTypes = {};

function ReviewBlock({ userName, reviewContent, reviewStar, variantKey, createdAt }) {
    return (

        <Card className="w-full" radius={"sm"}>
            <CardHeader className="flex gap-3 justify-between items-start">
                <div className="flex flex-col">
                    <p className="font-semibold">{userName}</p>
                    <StarRating rating={reviewStar} showText={false}/>
                </div>
                <div className={"text-gray-300"}>
                    {formatDate(createdAt)}
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p>{reviewContent}</p>
            </CardBody>
        </Card>

    );
}

export default ReviewBlock;