const express = require('express');
const {allUsers, singleUser, editUser, deleteUser, createUserJobHistory} = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/allusers', isAuthenticated, isAdmin, allUsers);
router.get('/user/:id', isAuthenticated, singleUser);
router.put('/user/edit/:id', isAuthenticated, editUser);
router.delete('/admin/user/delete/:id', isAuthenticated, deleteUser);
router.post('/user/jobhistory', isAuthenticated, createUserJobHistory);

module.exports = router;