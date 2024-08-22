const baseAdminUrl = "/admin";

const adminUrl = {
    dashboard: {
        index: `${baseAdminUrl}/dashboard`
    },
    category: {
        index: `${baseAdminUrl}/categories`,
        new: `${baseAdminUrl}/categories/new`,
        edit: (categoryId) => `${baseAdminUrl}/categories/${categoryId}/edit`
    },
    product: {
        index: `${baseAdminUrl}/products`,
        new: `${baseAdminUrl}/products/new`,
        details: (productId) => `${baseAdminUrl}/products/${productId}`,
        edit: (productId) => `${baseAdminUrl}/products/${productId}/edit`
    },
    order: {
        index: `${baseAdminUrl}/orders`,
        details: (orderId) => `${baseAdminUrl}/orders/${orderId}`
    },
    user: {
        index: `${baseAdminUrl}/users`,
        new: `${baseAdminUrl}/users/new`,
        profile: (userId) => `${baseAdminUrl}/users/${userId}/`,
        block: (userId) => `${baseAdminUrl}/users/${userId}/block`,
        unBlock: (userId) => `${baseAdminUrl}/users/${userId}/unblock`
    },
    voucher: {
        index: `${baseAdminUrl}/vouchers`,
        new: `${baseAdminUrl}/vouchers/new`,
        edit: (voucherId) => `${baseAdminUrl}/vouchers/${voucherId}/edit`
    }
};

const userUrl = {
    home: `/`,
    shop: `/shop`,
    product: {
        base: `/products`,
        details: (productId) => `/product/${productId}`
    },
    cart: {
        base: "/cart",
        checkout: "/cart/checkout"
    },
    profile: {
        addressDetails: (addressId) => `/profile/address/${addressId}`,
        newAddress: `/profile/address/new`,
        me: `/profile/me`,
        orderDetails: (orderId) => `/profile/order/${orderId}`
    },
    auth: {
        signIn: `/sign-in`,
        signUp: `/sign-up`
    }
};

export { baseAdminUrl, adminUrl, userUrl };
