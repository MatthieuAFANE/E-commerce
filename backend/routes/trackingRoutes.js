const express = require('express');
const router = express.Router();
const { getTrackingInfo } = require('../controllers/trackingController');

// Route : /api/tracking/Colissimo/123456789
router.route('/:carrier/:trackingNumber').get(getTrackingInfo);

module.exports = router;