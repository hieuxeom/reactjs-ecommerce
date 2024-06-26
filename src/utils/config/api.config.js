const apiBaseUrl = "http://localhost:5000/api"

const apiUrl = {
    auth: {
        signIn: [apiBaseUrl, '/auth/signin'].join(''),
        refreshToken: [apiBaseUrl, 'users/rftk'].join(''),
    },
    profile: {
        me: [apiBaseUrl, '/users/me'].join('')
    },
    category: {
        base: [apiBaseUrl, '/categories'].join(''),
    }
}

export {apiBaseUrl, apiUrl}