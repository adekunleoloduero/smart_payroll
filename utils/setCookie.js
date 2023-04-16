const { createJWTToken } = require('../helpers/createToken');
const passwordUtil = require('../utils/userPassword')



exports.setCookie = function(res, user) {
    const token = createJWTToken(user);
    const options = {
        expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    
    const userOuput = passwordUtil.removePassword(user);

    return res.status(200)
    .cookie('access_token', {
        token,
        options
    }).json({ status: true, user: userOuput });
    
}