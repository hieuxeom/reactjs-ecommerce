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

export {baseAdminUrl, adminUrl};
