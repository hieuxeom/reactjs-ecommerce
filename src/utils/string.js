export function trimString(input) {
    const length = input.length;

    if (length <= 8) {
        return input;
    }

    const start = input.substring(0, 4);
    const end = input.substring(length - 4);

    return `${start}...${end}`;
}

export function trimProductName(input, trimLength = 15) {
    const length = input.length;

    if (length <= trimLength) {
        return input;
    }

    const trimString = input.substring(0, trimLength);

    return `${trimString}...`;
}

const isValidEmail = (email) => {
    // Define the regex pattern for a valid email address
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Test the email against the pattern
    return emailPattern.test(email);
};