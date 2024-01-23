export const validateForm = (email, password, confirmPassword) => {
    if (email) {
        const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
        if (!isEmailValid) {
            return 'Email address is not valid'
        }
    }
    if (password) {
        const isPasswordValid = password.length < 8 ? false : true
        if (!isPasswordValid) {
            return 'Password is not valid'
        }
    }

    if (confirmPassword && confirmPassword != password) {
        return 'Confirm password not equal to password'
    }
    return null;

}