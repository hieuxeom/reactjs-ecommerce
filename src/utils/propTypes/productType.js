import PropTypes from "prop-types";

export const productReviewType = PropTypes.shape({
    userName: PropTypes.string.isRequired,
    reviewContent: PropTypes.string.isRequired,
    reviewStar: PropTypes.number.isRequired
});

export const productCommentType = PropTypes.shape({
    userName: PropTypes.string.isRequired,
    commentContent: PropTypes.string.isRequired
});

export const productVariantType = PropTypes.shape({
    variantKey: PropTypes.string.isRequired,
    variantLabel: PropTypes.string.isRequired,
    variantImage: PropTypes.string.isRequired,
    variantStock: PropTypes.number.isRequired,
    variantPrice: PropTypes.number.isRequired
});

export const productDetailsType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productPrice: PropTypes.string.isRequired,
    isDiscount: PropTypes.bool,
    discountPercents: PropTypes.number,
    productCategory: PropTypes.string.isRequired,
    productReviews: PropTypes.arrayOf(productReviewType),
    productComments: PropTypes.arrayOf(productCommentType),
    productRating: PropTypes.number,
    productVariants: PropTypes.arrayOf(productVariantType),
    isDeleted: PropTypes.bool,
    isActive: PropTypes.bool,
    views: PropTypes.number,
    soldCount: PropTypes.number
});

