const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// Exemple de route protégée (pour plus tard)
router.get('/profile', protect, (req, res) => {
    res.json(req.user); 
});

module.exports = router;