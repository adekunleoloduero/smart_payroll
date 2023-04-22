const { authService } = require('../services/index');
const prisma = require('../prisma/index');
const jwtTokenUtil = require('../utils/jwtToken');
const emailUtil = require('../utils/email');
const passwordUtil = require('../utils/password');
const crypto = require('crypto');
const config = require('../configs/index');



const signup = async (req, res, next) => {
    const payload = req.body;
    try {
        const response = await authService.signup(payload);
        if (response.statusCode == 403) {
            return res.status(response.statusCode).send(response.message);
        } else if (response.statusCode == 201) {
            return res.status(response.statusCode).json(response.user);
        } 
    } catch (error) {
        console.log(error);
        next(error);
    }
}


const signin = async (req, res, next) => {
    const payload = req.body;
    try {
        //Find user by email
        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })
        
        if (!user) {
            return res.status(400).send('Invalid email');
        }

        //Validate password
        const passwordIsValid = await passwordUtil.validatePassword(payload.password, user.password);
        if (!passwordIsValid) {
            return res.status(400).send('Invalid password');
        }

        const userOutput = await passwordUtil.returnUserWithoutPassword(user);
        const token = await jwtTokenUtil.createToken(user);
        res.status(200).
        cookie(
            "access_token", 
            token,
            {
                httpOnly: true,
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000)
            } 
        ).
        json({ status: true, user: userOutput });
    } catch(error) {
        console.log(error);
        next(error);
    }
}


const logout = async (req, res, next) => {
    return res.clearCookie('access_token')
    .status(200).send('Successfully logged out');
}


const requestPasswordResetLink = async (req, res, next) => {
    try {
        const buffer = crypto.randomBytes(32);
        const token = buffer.toString("hex");
                 
        const user = await prisma.user.findUnique({ 
            where: {
                email: req.body.email
            }
        });
    
        if (!user) {
          return res.status(400).send('Invalid email');
        }
    
        
        resetToken = token; //Store reset token
        resetTokenExpiration = new Date(Date.now() + 60 * 30  * 1000); //Set token to expire in 30 minutes
        const link = `${config.BASE_URL}:${config.PORT}/api/auth/change-password/${user.id}/${token}`;

        let name;
        if (user.firstName == null) {
            name = user.email;
        } else {
            name = user.firstName
        }

        const data = {
            name,
            email: user.email,
            subject: 'RESET YOUR PASSWORD',
            token
        }
        
        data.link = link;
        await emailUtil.sendPasswordResetLink(data); //Send password re-set link to user email
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                resetToken,
                resetTokenExpiration
            }
        });
        return res.status(200).json({ status: true, email: user.email, resetLink: link });
    } catch(error) {
        console.log(error);
        next(error);
    }
}

const changePassword = async (req, res, next) => {
    const { userId, resetToken } = req.params;
    const { email, password, confirmPassword } = req.body;

    if (password != confirmPassword) {
        return res.status(400).send("Password confirmation failed");
    }

    const data = {
        userId,
        resetToken,
        email,
        password,
        confirmPassword
    }
    try {
        const response = await authService.changePassword(data);
        if (!response) {
            return res.status(403).send("Invalid or expired link");
        }
        return res.status(200).json({ status: true, user: response });
    } catch (error) {
        console.log(error);  
        next(error)      ;
    }
}


module.exports = {
    signup,
    signin,
    logout,
    requestPasswordResetLink,
    changePassword
}