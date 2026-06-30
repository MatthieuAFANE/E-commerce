const express = require('express');
const router = express.Router();
const { getPods, createPod } = require('../controllers/podController');

// Quand on va sur '/' (qui sera /api/pods), on utilise GET pour lire et POST pour créer
router.route('/')
    .get(getPods)
    .post(createPod);

module.exports = router;