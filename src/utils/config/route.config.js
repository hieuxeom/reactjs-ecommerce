const baseAdminUrl = "/admin";

const adminUrl = {
    dashboard: {
        index: `${baseAdminUrl}/dashboard`
    },
    category: {
        index: `${baseAdminUrl}/categories`,
        new: `${baseAdminUrl}/categories/new`,
        edit: (categoryId) => `${baseAdminUrl}/categories/${categoryId}/edit`,
        delete: (categoryId) => `${baseAdminUrl}/categories/delete/${categoryId}`
    },
    product: {
        index: `${baseAdminUrl}/products`,
        new: `${baseAdminUrl}/products/new`,
        edit: (productId) => `${baseAdminUrl}/products/edit/${productId}`,
        delete: (productId) => `${baseAdminUrl}/products/delete/${productId}`
    },
    order: {
        index: `${baseAdminUrl}/orders`,
        new: `${baseAdminUrl}/orders/new`,
        edit: (orderId) => `${baseAdminUrl}/orders/edit/${orderId}`,
        delete: (orderId) => `${baseAdminUrl}/orders/delete/${orderId}`
    },
    user: {
        index: `${baseAdminUrl}/users`,
        new: `${baseAdminUrl}/users/new`,
        edit: (userId) => `${baseAdminUrl}/users/edit/${userId}`,
        delete: (userId) => `${baseAdminUrl}/users/delete/${userId}`
    }
};

export {baseAdminUrl, adminUrl};
