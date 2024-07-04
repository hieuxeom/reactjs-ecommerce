const waitingStatus = {
    key: "waiting",
    label: "Đang chờ xác nhận",
    tagColor: "warning",
    confirmText: "Xác nhận đơn hàng",
    nextStep: "processing"
};

const processingStatus = {
    key: "processing",
    label: "Đang chuẩn bị hàng",
    tagColor: "secondary",
    confirmText: "Đã chuẩn bị xong",
    nextStep: "delivering"
};

const deliveringStatus = {
    key: "delivering",
    label: "Delivering",
    tagColor: "primary",
    confirmText: "Đã đến điểm giao",
    nextStep: "delivered"
};

const deliveredStatus = {
    key: "delivered",
    label: "Delivered",
    tagColor: "primary",
    confirmText: "Hoàn thành đơn hàng",
    nextStep: "completed"
};

const completedStatus = {
    key: "completed",
    label: "Completed",
    tagColor: "success"
};

const canceledStatus = {
    key: "canceled",
    label: "Canceled",
    tagColor: "danger"
};

const returnedStatus = {
    key: "returned",
    label: "Returned",
    tagColor: "secondary"
};

export const getOrderStatusVariant = (orderStatus) => {
    switch (orderStatus) {
        case "waiting":
            return waitingStatus;
        case "processing":
            return processingStatus;
        case "delivering":
            return deliveringStatus;
        case "delivered":
            return deliveredStatus;
        case "completed":
            return completedStatus;
        case "canceled":
            return canceledStatus;
        case "returned":
            return returnedStatus;
    }
};

export const listAllOrderStatus = [
    waitingStatus,
    processingStatus,
    deliveringStatus,
    deliveredStatus,
    completedStatus,
    canceledStatus,
    returnedStatus
];

export const listAdminOrderStatus = [
    waitingStatus,
    processingStatus,
    deliveringStatus,
    deliveredStatus,
    completedStatus
];