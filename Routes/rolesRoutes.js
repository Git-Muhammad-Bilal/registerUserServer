const express = require('express');
const { createRole, getRoleInfo, getRoles, editRole } = require('../controllers/createRole');
const router = express.Router();

router.post('/createRole', createRole) 
router.post('/editRole', editRole)
router.get('/getRoleInfo/:roleId', getRoleInfo) 
router.get('/getRoles', getRoles)


module.exports = router;