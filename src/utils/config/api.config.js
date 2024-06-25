const apiConfig = {
    baseUrl: "http://localhost:5000/api",
}

const apiUrl = {
    auth: {
        signIn: [apiConfig.baseUrl, '/auth/signin'].join(''),
        refreshToken: [apiConfig.baseUrl, 'users/rftk'].join(''),
    },
    profile: {
        me: [apiConfig.baseUrl, '/users/me'].join('')
    }
}

export {apiConfig, apiUrl}