const express = require('express');
const router = express.Router();

//========================================[MODULES ARE REQUIRED HERE]====================================================
const { getData, createUrl, getUrl } = require('../controllers/urlController.js');


//===================================================[URL ROUTE HANDLER]===========================================================

router.get('/', getData);

router.post('/shorten', createUrl);

router.get('/:urlKey', getUrl);

module.exports = router;