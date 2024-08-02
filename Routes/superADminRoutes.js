const express = require('express');
const router = express.Router();
const { getSuprAdmin } = require('../controllers/admin');

router.get('/SuperAdmin', getSuprAdmin) 

module.exports = router;