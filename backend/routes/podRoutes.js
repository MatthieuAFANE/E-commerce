const express = require('express');
const router = express.Router();
const { getPods, getPodById, createPod } = require('../controllers/podController');

router.route('/')
    .get(getPods)
    .post(createPod);

// NOUVELLE ROUTE : Pour afficher un seul produit
router.route('/:id')
    .get(getPodById);

module.exports = router;