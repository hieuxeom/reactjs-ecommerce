import PropTypes from "prop-types";
import { CartItemPropTypes, UserAddressPropTypes } from "./userType.js";

export const OrderPropTypes = {
    customerId: PropTypes.string.isRequired,
    orderItems: PropTypes.arrayOf(CartItemPropTypes).isRequired,
    totalPrice: PropTypes.number.isRequired,
    subTotalPrice: PropTypes.number.isRequired,
    reducedFee: PropTypes.number.isRequired,
    shippingFee: PropTypes.number.isRequired,
    orderDate: PropTypes.instanceOf(Date),
    voucherCode: PropTypes.string,
    orderStatus: PropTypes.oneOf(["waiting", "processing", "delivering", "delivered", "completed", "canceled", "returned"]),
    customerInfo: UserAddressPropTypes.isRequired,
    isReturned: PropTypes.bool,
    isCancelled: PropTypes.bool,
    explainReason: PropTypes.string
};