const jobType = require('../models/jobTypeModel')
const ErrorResponse = require('../utils/errorResponse.js');

exports.createJobType = async(req, res, next) => {
    try {
        const jobT = await jobType.create({
            jobTypeName: req.body.jobTypeName,
            user: req.user.id,
        });
        res.status(201).json({
            success: true,
            jobT
        })
    } catch(err) {
        next(err);
    }
}

exports.allJobsType = async (req, res, next) => {
    try {
        const jobT = await jobType.find();
        res.status(200).json({
            success: true,
            jobT
        })
    } catch (error) {
        next(error);
    }
}