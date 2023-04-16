const prisma = require('../prisma/index');
const bcrypt = require('bcrypt');
const passwordUtil = require('../utils/userPassword');



const signup = async (payload) => {
    let response;
    //Check whether user is already registered
    const exitingUser = await prisma.user.findUnique({
        where: {
            username: payload.username
        }
    })

    if (exitingUser) {
        response = {
            statusCode: 403,
            message: "Username already exits."
        }
    } else {
        const hashedPassword =  await bcrypt.hash(payload.password, 10);
        payload.password = hashedPassword;
        const user = await prisma.user.create({
            data: payload
        })

        //Don't send the password back
        const userOutput = passwordUtil.removePassword(user);
        response = {
            statusCode: 201,
            user: userOutput
        }
    }
    return response;
}


module.exports = {
    signup,
}

