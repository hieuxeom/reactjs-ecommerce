export const isNumber = (number) => {

    if (typeof number === "string") {
        return !isNaN(number) && number.trim() !== "";
    } else if (typeof number === "number") {
        return !isNaN(number);
    }
    return false;
};


