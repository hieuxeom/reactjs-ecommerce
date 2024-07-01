import React from "react";
import PropTypes from "prop-types";
import {IoMdStar} from "react-icons/io";
import classConfig from "../../utils/config/class.config.js";
import classNames from "classnames";

function StarRating({rating, showText = true}) {
    // Function to generate stars based on rating
    const generateStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const fillPercentage = Math.min(Math.max(rating - (i - 1), 0), 1) * 100;
            stars.push(
                <div key={i} className="relative">
                    <IoMdStar className="text-gray-300" size={classConfig.icon.large}/>
                    <IoMdStar
                        size={classConfig.icon.large}
                        className="absolute top-0 left-0 text-yellow-500"
                        style={{clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`}}
                    />
                </div>
            );
        }
        return stars;
    };

    return (
        <div className="flex items-start gap-2">
            {showText && <span
                className={classNames(classConfig.fontSize.sub, classConfig.textColor.navyBlue, "underline font-semibold")}>{rating.toFixed(1)}
            </span>}
            <div className={"flex items-center"}>{generateStars()}</div>
        </div>
    );
}

StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
    showText: PropTypes.bool
};

export default StarRating;
