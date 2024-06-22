const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { createJobType, allJobsType, updateJobType, deleteJobType } = require('../controllers/jobTypeController');
const router = express.Router();

router.post('/type/create', isAuthenticated, createJobType)
router.get('/type/jobs', allJobsType)
router.put('/type/update/:type_id', isAuthenticated, updateJobType)
router.delete('/type/delete/:type_id', isAuthenticated, deleteJobType)

module.exports = router;