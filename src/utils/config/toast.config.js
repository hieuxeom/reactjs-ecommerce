const toastConfig = {
    success: (message, callback) => ({
        render: message,
        isLoading: false,
        autoClose: 1000,
        type: "success",
        onClose: callback
    }),
    error: (message) => ({
        render: message,
        isLoading: false,
        autoClose: 3000,
        type: "error"
    }),
    warning: (message) => ({
        render: message,
        isLoading: false,
        autoClose: 3000,
        type: "warning"
    }),
    loading: {
        isLoading: true,
        autoClose: false
    }
};

export default toastConfig;