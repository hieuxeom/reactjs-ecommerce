export const isValidEmail = (email) => {
    // Define the regex pattern for a valid email address
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Test the email against the pattern
    return emailPattern.test(email);
};

export const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^0[35789]\d{8}$/;

    return phoneNumberPattern.test(phoneNumber);
};