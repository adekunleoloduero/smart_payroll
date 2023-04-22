const prisma = require('../prisma/index');
const passwordUtil = require('../utils/password');




const signup = async (payload) => {
    let response;
    //Check whether user is already registered
    const exitingUser = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })

    if (exitingUser) {
        response = {
            statusCode: 403,
            message: "Email already registered."
        }
    } else {
        const hashedPassword = await passwordUtil.getHashedPassword(payload.password);
        payload.password = hashedPassword;
        const user = await prisma.user.create({
            data: payload
        })

        //Don't send the password back
        const userOutput = await passwordUtil.returnUserWithoutPassword(user);
        response = {
            statusCode: 201,
            user: userOutput
        }
    }
    return response;
}


const changePassword = async (data) => {
    let response;
    
    const user = await prisma.user.findUnique({
        where: {
            id: data.userId,
        }
    });

    if (!user) {
        return false
    }
    
    if (user.resetToken != data.resetToken || new Date(Date.now()) > user.resetTokenExpiration ) {
        return false
    }

    // user.password = data.password;
    // user.resetToken = "";
    // user.resetTokenExpiration = new Date(Date.now());
    const hashedPassword = await passwordUtil.getHashedPassword(data.password); //Encrypt password before saving
    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            password: hashedPassword,
            resetToken: "",
            resetTokenExpiration: new Date(Date.now())
        }
    });

    response = await passwordUtil.returnUserWithoutPassword(updatedUser);
    return response;
}


module.exports = {
    signup,
    changePassword
}

