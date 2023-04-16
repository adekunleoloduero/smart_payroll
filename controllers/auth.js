const { authService } = require('../services/index');
const prisma = require('../prisma/index');
const cookieUtil = require('../utils/setCookie');
const bcrypt = require('bcrypt');


const signup = async (req, res, next) => {
    const payload = req.body;
    try {
        const response = await authService.signup(payload);
        if (response.statusCode == 403) {
            return res.status(response.statusCode).json({ message: response.message });
        } else if (response.statusCode == 201) {
            return res.status(response.statusCode).json(response.user);
        } 
    } catch (err) {
        console.log(err);
    }
}


const signin = async (req, res, next) => {
    const payload = req.body;
    try {
        //Find user by username
        const user = await prisma.user.findUnique({
            where: {
                username: payload.username
            }
        })
        
        if (!user) {
            return res.status(400).json({
                status: false,
                message: 'Invalid username'
            });
        }

        //Validate password
        const passwordIsValid = await bcrypt.compare(payload.password, user.password);
        if (!passwordIsValid) {
            return res.status(400).json({
                status: false,
                message: 'Invalid password'
            });
        }
        //Set cookie and return any other relevant data
        cookieUtil.setCookie(res, user);
    } catch(err) {
        console.log(err);
    }
}


const logout = async (req, res, next) => {
    res.send('logout');
}


module.exports = {
    signup,
    signin,
    logout
}