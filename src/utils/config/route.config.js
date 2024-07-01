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
        new: `${baseAdminUrl}/orders/new`,
        details: (orderId) => `${baseAdminUrl}/orders/${orderId}/details/`
    },
    user: {
        index: `${baseAdminUrl}/users`,
        new: `${baseAdminUrl}/users/new`,
        edit: (userId) => `${baseAdminUrl}/users/edit/${userId}`,
        delete: (userId) => `${baseAdminUrl}/users/delete/${userId}`
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
    }
};

export {baseAdminUrl, adminUrl, userUrl};
