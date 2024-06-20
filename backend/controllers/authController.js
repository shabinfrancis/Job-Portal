const User = require('../models/userModel')
const ErrorResponse = require('../utils/errorResponse')
const {comparePassword} = require('../models/userModel')

exports.signup = async (req, res, next) => {
    const {email} = req.body;
    const userExist = await User.findOne({email});
    if(userExist){

        return next(new ErrorResponse("Email already registered", 400));
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        });
    }  catch(err) {
        next(err);
    }
}

const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res
    .status(codeStatus)
    .cookie('token', token, {maxAge: 60*60*1000, httpOnly: true})
    .json({
        success: true,
        token,
        user
    })

}

exports.signin = async (req, res, next) => {
    
    try {

        const {email, password} = req.body;
        if (!email || !password) {
            return next(new ErrorResponse("Please provide email and password", 400));
        }

        const user = await User.findOne({email});
        if (!user) {
            return next(new ErrorResponse("Invalid email", 400));
        }

        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid password", 400));
        }

        sendTokenResponse(user, 200, res);

    } catch(err) {
        next(err);
    }
}

exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
}

exports.userProfile = async(req, res, next) => {

    const user = await User.findById();
    res.status(200).json({
        success: true,
        user,
    });
}