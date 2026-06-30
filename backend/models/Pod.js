const mongoose = require('mongoose');

// On définit le "squelette" d'un pod (produit)
const podSchema = mongoose.Schema({
    name: { type: String, required: true }, // ex: "Pod Pêche"
    flavor: { type: String, required: true }, // ex: "Fruité"
    description: { type: String, required: true }, // ex: "Donnez un goût de pêche estivale à votre eau."
    price: { type: Number, required: true }, // ex: 5.99
    image: { type: String, required: true }, // URL de l'image
    intensity: { type: Number, required: true, min: 1, max: 5 }, // Force du goût (de 1 à 5)
    stock: { type: Number, required: true, default: 0 } // Quantité en stock
}, {
    timestamps: true // Ajoute automatiquement la date de création et de modification
});

module.exports = mongoose.model('Pod', podSchema);