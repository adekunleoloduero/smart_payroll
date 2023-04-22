const jwt = require('jsonwebtoken');
const config = require('../configs/index');


exports.createToken = async function(user) {
    const tokenObject = {
        userId: user._id,
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(tokenObject, config.JWT_SECRET, { expiresIn: '1 day' });
    return token;
}