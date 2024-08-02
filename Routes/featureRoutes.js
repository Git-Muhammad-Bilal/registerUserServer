const express = require('express');
const router = express.Router();
const { CreateFeaturePermissions, getFeatureInfo, getMeta } = require('../controllers/features');

router.get('/getFeatureInfo', getFeatureInfo) 
router.get('/getFeatures', getMeta) 

module.exports = router;