const Pod = require('../models/Pod');

// @desc    Récupérer tous les pods
// @route   GET /api/pods
// @access  Public
const getPods = async (req, res) => {
    try {
        const pods = await Pod.find({});
        res.json(pods);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des pods" });
    }
};

// @desc    Créer un nouveau pod
// @route   POST /api/pods
// @access  Privé (plus tard, réservé à l'admin)
const createPod = async (req, res) => {
    try {
        const { name, flavor, description, price, image, intensity, stock } = req.body;

        const pod = new Pod({
            name, flavor, description, price, image, intensity, stock
        });

        const createdPod = await pod.save();
        res.status(201).json(createdPod); // 201 = Créé avec succès
    } catch (error) {
        res.status(400).json({ message: "Données invalides", error: error.message });
    }
};

module.exports = { getPods, createPod };