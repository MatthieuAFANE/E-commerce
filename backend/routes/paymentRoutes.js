const express = require('express');
const router = express.Router();
const { createStripeIntent, updateOrderToPaid, getPaypalClientId } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/stripe-intent', protect, createStripeIntent);
router.put('/:id/pay', protect, updateOrderToPaid);
router.get('/paypal-config', protect, getPaypalClientId);

module.exports = router;