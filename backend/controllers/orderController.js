const Order = require('../models/Order');

// @desc    Créer une nouvelle commande
// @route   POST /api/orders
// @access  Privé (Il faut être connecté)
const addOrderItems = async (req, res) => {
    try {
        const { orderItems, shippingAddress, carrier, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: "Le panier est vide" });
        }

        const order = new Order({
            user: req.user._id, // L'ID vient du middleware 'protect'
            orderItems, shippingAddress, carrier, paymentMethod, itemsPrice, shippingPrice, totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);

} catch (error) {
        console.error("❌ ERREUR CREATION COMMANDE :", error);
        res.status(500).json({ message: "Erreur lors de la création de la commande", details: error.message });
    }
};

module.exports = { addOrderItems };