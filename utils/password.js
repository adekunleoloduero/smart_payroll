const bcrypt = require('bcrypt');


exports.returnUserWithoutPassword = async function(userObject) {
    const { password, ...others } = userObject;
    return others;
}


exports.getHashedPassword = async (password) => {
    const hash = bcrypt.hash(password, 10);
    return hash;
}


exports.validatePassword = async (passwordInput, savedPassword) => {
    const isValid = bcrypt.compare(passwordInput, savedPassword);
    return isValid;
}
