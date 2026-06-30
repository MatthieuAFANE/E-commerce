const express = require('express');
const router = express.Router();
const { addOrderItems } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware'); // Sécurité !

// On protège la route : seul un utilisateur connecté peut créer une commande
router.route('/').post(protect, addOrderItems);

module.exports = router;