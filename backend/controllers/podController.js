const Pod = require('../models/Pod');

const getPods = async (req, res) => {
    try {
        const pods = await Pod.find({});
        res.json(pods);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des pods" });
    }
};

// NOUVELLE FONCTION : Récupérer un seul pod par son ID
const getPodById = async (req, res) => {
    try {
        const pod = await Pod.findById(req.params.id);
        if (pod) {
            res.json(pod);
        } else {
            res.status(404).json({ message: "Pod introuvable" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

const createPod = async (req, res) => {
    try {
        const { name, flavor, description, price, image, intensity, stock } = req.body;
        const pod = new Pod({ name, flavor, description, price, image, intensity, stock });
        const createdPod = await pod.save();
        res.status(201).json(createdPod);
    } catch (error) {
        res.status(400).json({ message: "Données invalides", error: error.message });
    }
};

// On n'oublie pas d'exporter la nouvelle fonction à la fin :
module.exports = { getPods, getPodById, createPod };