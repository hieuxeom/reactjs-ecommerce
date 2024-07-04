const apiBaseUrl = "http://localhost:5000/api";
const imageUrl = "http://localhost:5000/images/";

const apiUrl = {
    auth: {
        signIn: `${apiBaseUrl}/auth/sign-in`,
        signUp: `${apiBaseUrl}/auth/sign-up`,
        refreshToken: `${apiBaseUrl}/users/rftk`
    },
    user: {
        me: `${apiBaseUrl}/users/me`,
        listAddresses: `${apiBaseUrl}/users/me/address`,
        cart: `${apiBaseUrl}/carts`

    },
    category: {
        base: `${apiBaseUrl}/categories`,
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
        activation: (productId) => `${apiBaseUrl}/products/${productId}/activation`
    },
    cart: {
        base: `${apiBaseUrl}/carts`,
        add: `${apiBaseUrl}/carts`,
        reset: `${apiBaseUrl}/carts`,
        voucher: `${apiBaseUrl}/carts/voucher`
    },
    order: {
        getAll: `${apiBaseUrl}/orders`,
        new: `${apiBaseUrl}/orders`,
        changeStatus: (orderId) => `${apiBaseUrl}/orders/${orderId}/order-status`,
        details: (orderId) => `${apiBaseUrl}/orders/${orderId}`,
        canceled: (orderId) => `${apiBaseUrl}/orders/${orderId}/cancel-order`
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
    }

};

export { apiBaseUrl, apiUrl, imageUrl };