const apiBaseUrl = "http://localhost:5000/api"
const imageUrl = "http://localhost:5000/images/"

const apiUrl = {
    auth: {
        signIn: `${apiBaseUrl}/auth/sign-in`,
        signUp: `${apiBaseUrl}/auth/sign-up`,
        refreshToken: `${apiBaseUrl}/users/rftk`
    },
    profile: {
        me: `${apiBaseUrl}/users/me`
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
        delete: (categoryId) => `${apiBaseUrl}/products/${categoryId}`,
        views: (productId) => `${apiBaseUrl}/products/${productId}/views`,
        activation: (productId) => `${apiBaseUrl}/products/${productId}/activation`
    }
};

export {apiBaseUrl, apiUrl, imageUrl}