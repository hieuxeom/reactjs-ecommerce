const baseAdminUrl = "/admin"

const adminUrl = {
    dashboard: {
        index: [baseAdminUrl, '/dashboard'].join(''),
    },
    category: {
        index: [baseAdminUrl, '/categories'].join(''),
        new: [baseAdminUrl, '/categories', '/new'].join(''),
        edit: [baseAdminUrl, '/categories', '/edit'].join(''),
        delete: [baseAdminUrl, '/categories', '/delete'].join(''),
    },
    product: {
        index: [baseAdminUrl, '/products'].join(''),
        new: [baseAdminUrl, '/products', '/new'].join(''),
        edit: [baseAdminUrl, '/products', '/edit'].join(''),
        delete: [baseAdminUrl, '/products', '/delete'].join(''),
    },
    order: {
        index: [baseAdminUrl, '/orders'].join(''),
        new: [baseAdminUrl, '/orders', '/new'].join(''),
        edit: [baseAdminUrl, '/orders', '/edit'].join(''),
        delete: [baseAdminUrl, '/orders', '/delete'].join(''),
    },
    user: {
        index: [baseAdminUrl, '/users'].join(''),
        new: [baseAdminUrl, '/users', '/new'].join(''),
        edit: [baseAdminUrl, '/users', '/edit'].join(''),
        delete: [baseAdminUrl, '/users', '/delete'].join(''),
    },

}

export {baseAdminUrl, adminUrl}