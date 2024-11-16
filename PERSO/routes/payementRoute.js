const express = require('express');
const payementController = require('../controllers/payementController');

const router = express.Router();

router.get('/validate-data', payementController.validateData); 

router.post('/validate-payment', payementController.validatePayment);

module.exports = router;
