import React from "react";
import PropTypes from "prop-types";
import { trimString } from "../../../utils/string.js";
import { Chip } from "@nextui-org/react";
import { getOrderStatusVariant } from "../../../utils/dataDefault/orderStatus.js";
import { OrderPropTypes } from "../../../utils/propTypes/orderType.js";
import { useNavigate } from "react-router-dom";
import { userUrl } from "../../../utils/config/route.config.js";

OrderRow.propTypes = {
    orderData: OrderPropTypes
};

function OrderRow({ orderData }) {

    const navigate = useNavigate();

    const handleNavigateToOrderDetails = () => {
        return navigate(userUrl.profile.orderDetails(orderData._id));
    };

    return (
        <div className={"flex flex-col gap-2 border border-black/10 rounded-xl p-4 cursor-pointer"}
             onClick={handleNavigateToOrderDetails}>
            <div className={"flex justify-between"}>
                <div className={"flex items-center gap-1"}>
                    <p>#{trimString(orderData._id)} - </p>
                    <Chip className={"italic"}>{orderData.orderItems.length} sản phẩm </Chip>
                </div>
                <p>{orderData.orderDate}</p>
            </div>
            <div>
                <Chip color={getOrderStatusVariant(orderData.orderStatus).tagColor}
                      variant={"flat"}
                >
                    {getOrderStatusVariant(orderData.orderStatus).label}
                </Chip>
            </div>
        </div>
    );
}

export default OrderRow;