const express = require('express');
const { register, login, logout, checkAuth, getAllUsers, getOneUser } = require("../userConroller");
const verifyAuth = require('../../middlwhere/verifyAth');
const router = express.Router();


router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout) 
router.get('/checkAuth', verifyAuth, checkAuth)
router.get('/all', getAllUsers)
router.get('/:id', getOneUser)
module.exports = router;