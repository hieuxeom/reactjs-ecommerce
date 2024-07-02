import React from "react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {IoCheckmarkDoneSharp} from "react-icons/io5";
import {color} from "framer-motion";
import classConfig from "../../utils/config/class.config.js";
import classNames from "classnames";
import {Button} from "@nextui-org/react";
import {userUrl} from "../../utils/config/route.config.js";

CompleteOrder.propTypes = {};

function CompleteOrder(props) {

    const navigate = useNavigate();

    const handleNavigateToShop = () => {
        return navigate(userUrl.shop);
    };

    return (
        <div className={"w-full max-w-7xl h-[55vh] mt-8 flex flex-col gap-4 justify-center items-center"}>
            <div>
                <IoCheckmarkDoneSharp size={"128"} className={classConfig.textColor.success}/>
            </div>
            <div className={"w-full text-center flex flex-col gap-4"}>
                <h2 className={classNames(classConfig.fontSize.h2, classConfig.textColor.primary)}>Bạn đã đặt hàng thành
                    công!</h2>
                <div
                    className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray, "flex flex-col gap-1 justify-center italic")}>
                    <p>
                        Chúng tôi cảm ơn vì bạn đã đặt hàng! Đơn hàng của bạn sẽ được xác nhận trong 1-2 giờ tiếp theo.
                    </p>
                    <p>Và sẽ được giao trong 1-2 ngày cho khu vực thành phố Hồ Chí Minh, 3-7 ngày cho các khu vực
                        khác</p>
                </div>
            </div>
            <div>
                <Button color={"primary"} size={"lg"} onClick={handleNavigateToShop}>Tiếp tục mua sắm</Button>
            </div>
        </div>
    );
}

export default CompleteOrder;