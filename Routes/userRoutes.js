const express = require('express');
const router = express.Router();
const { getUser, createUser, getUsersList, getLogedInUser, getUserSignUpInfo } = require('../controllers/user');

router.get('/getUserList', getUsersList) 
router.get('/getUserSignUpInfo/:subUserId', getUserSignUpInfo) 
router.get('/getUserInfo/:userId', getUser) 
router.get('/getUserInfo/:userId/:featureId', getUser) 
router.post('/getLogedInUser', getLogedInUser) 
router.post('/createUser',createUser) 

module.exports = router;