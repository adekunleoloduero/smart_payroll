const { authService } = require('../services/index');


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
    res.send('Signin');
}


const logout = async (req, res, next) => {
    res.send('logout');
}


module.exports = {
    signup,
    signin,
    logout
}