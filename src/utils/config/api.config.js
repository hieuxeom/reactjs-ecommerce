const apiBaseUrl = "http://localhost:5000/api"

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
    }
};

export {apiBaseUrl, apiUrl}