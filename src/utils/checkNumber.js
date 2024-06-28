export const isNumber = (number) => {
    return !isNaN(number) && number.trim() !== "";
};