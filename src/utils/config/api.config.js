const apiBaseUrl = "http://localhost:5000/api";
const imageUrl = "http://localhost:5000/images/";

const apiUrl = {
    auth: {
        signIn: `${apiBaseUrl}/auth/sign-in`,
        signUp: `${apiBaseUrl}/auth/sign-up`,
        refreshToken: `${apiBaseUrl}/users/rftk`
    },
    user: {
        all: `${apiBaseUrl}/users`,
        me: `${apiBaseUrl}/users/me`,
        details: (userId) => `${apiBaseUrl}/users/${userId}`,
        listAddresses: `${apiBaseUrl}/users/me/address`,
        listOrders: `${apiBaseUrl}/users/me/orders`,
        listOrdersByUserId: (userId) => `${apiBaseUrl}/users/${userId}/orders`,
        addressDetails: (addressId) => `${apiBaseUrl}/users/me/address/${addressId}`,
        newAddress: `${apiBaseUrl}/users//me/address`,
        editAddress: (addressId) => `${apiBaseUrl}/users/me/address/${addressId}`,
        deleteAddress: (addressId) => `${apiBaseUrl}/users/me/address/${addressId}`,
        cart: `${apiBaseUrl}/carts`,
        changeUsername: `${apiBaseUrl}/users/username`,
        changeEmail: `${apiBaseUrl}/users/email-address`,
        activation: (userId) => `${apiBaseUrl}/users/${userId}/activation`

    },
    category: {
        base: `${apiBaseUrl}/categories?onlyActive=true`,
        all: `${apiBaseUrl}/categories`,
        onlyActive: `${apiBaseUrl}/categories?onlyActive=true`,
        details: (categoryId) => `${apiBaseUrl}/categories/${categoryId}`,
        edit: (categoryId) => `${apiBaseUrl}/categories/${categoryId}`,
        delete: (categoryId) => `${apiBaseUrl}/categories/${categoryId}`,
        activation: (categoryId) => `${apiBaseUrl}/categories/${categoryId}/activation`
    },
    product: {
        base: `${apiBaseUrl}/products`,
        all: `${apiBaseUrl}/products?isFull=true`,
        onlyActive: `${apiBaseUrl}/products`,
        newArrivals: `${apiBaseUrl}/products/arrivals`,
        topSells: `${apiBaseUrl}/products/top-sell`,
        edit: (productId) => `${apiBaseUrl}/products/${productId}`,
        details: (productId) => `${apiBaseUrl}/products/${productId}`,
        variant: (productId, variantKey) => `${apiBaseUrl}/products/${productId}/${variantKey}`,
        delete: (categoryId) => `${apiBaseUrl}/products/${categoryId}`,
        views: (productId) => `${apiBaseUrl}/products/${productId}/views`,
        activation: (productId) => `${apiBaseUrl}/products/${productId}/activation`,
        reviews: (productId) => `${apiBaseUrl}/products/${productId}/reviews`
    },
    cart: {
        base: `${apiBaseUrl}/carts`,
        add: `${apiBaseUrl}/carts`,
        reset: `${apiBaseUrl}/carts`,
        voucher: `${apiBaseUrl}/carts/voucher`,
        delete: `${apiBaseUrl}/carts/delete`
    },
    order: {
        getAll: `${apiBaseUrl}/orders`,
        new: `${apiBaseUrl}/orders`,
        changeStatus: (orderId) => `${apiBaseUrl}/orders/${orderId}/order-status`,
        details: (orderId) => `${apiBaseUrl}/orders/${orderId}`,
        canceled: (orderId) => `${apiBaseUrl}/orders/${orderId}/cancel-order`,
        returned: (orderId) => `${apiBaseUrl}/orders/${orderId}/return`

    },
    address: {
        provinces: "https://vapi.vnappmob.com/api/province",
        districts: (provinceId) => `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
        wards: (districtId) => `https://vapi.vnappmob.com/api/province/ward/${districtId}`
    },
    voucher: {
        getAll: `${apiBaseUrl}/vouchers`,
        details: (voucherId) => `${apiBaseUrl}/vouchers/${voucherId}`,
        new: `${apiBaseUrl}/vouchers`,
        edit: (voucherId) => `${apiBaseUrl}/vouchers/${voucherId}`,
        activation: (voucherId) => `${apiBaseUrl}/vouchers/${voucherId}/activation`
    },
    analytics: {
        all: `${apiBaseUrl}/analytics`
    }
};

export { apiBaseUrl, apiUrl, imageUrl };