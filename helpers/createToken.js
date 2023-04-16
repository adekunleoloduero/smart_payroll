const jwt = require('jsonwebtoken');
const config = require('../configs/index');


exports.createJWTToken = function(user) {
    const tokenObject = {
        userId: user._id,
        username: user.username,
        role: user.role
    }
    const token = jwt.sign(tokenObject, config.JWT_SECRET, { expiresIn: '1 day' });
    return token;
}