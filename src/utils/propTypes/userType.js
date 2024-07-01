import PropTypes from "prop-types";

export const CartItemPropTypes = PropTypes.shape({
    productId: PropTypes.string.isRequired,
    variantKey: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
});

export const UserCartPropTypes = PropTypes.shape({
    _id: PropTypes.string,
    cartItems: PropTypes.arrayOf(CartItemPropTypes),
    voucherCode: PropTypes.string,
    totalPrice: PropTypes.number,
    discountPrice: PropTypes.number,
    deliveryFee: PropTypes.number,
    subTotalPrice: PropTypes.number
});

export const UserAddressPropTypes = PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    fullAddress: PropTypes.string.isRequired,
    isDefault: PropTypes.bool
});

export const UserModelPropTypes = PropTypes.shape({
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    cart: UserCartPropTypes,
    listAddresses: PropTypes.arrayOf(UserAddressPropTypes),
    role: PropTypes.number,
    isActive: PropTypes.bool
});


