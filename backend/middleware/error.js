const ErrorResponse = require('../utils/errorResponse.js');

const errorHandler = (err, req, res, next) => {

    let error = {...err};
    error.message = err.message;

    if(err.name === "CastError") {

        const message = `Resource not found ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    if(err.code === "11000") {

        const message = "Duplicate filed value entered";
        error = new ErrorResponse(message, 400);
    }

    if(err.name === "ValidationError") {

        const message = Object.values(err.errors).map(val => ' ' + val.message);
        error = new ErrorResponse(message, 404);
    }

    res.status(error.codeCode || 500).json({

        success: false,
        error: error.message || "server error"
    })
}

module.exports = errorHandler;