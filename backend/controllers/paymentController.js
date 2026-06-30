const Stripe = require('stripe');
const Order = require('../models/Order');

// 1. Demande à Stripe de créer une intention de paiement
const createStripeIntent = async (req, res) => {
    // On initialise Stripe avec la clé secrète de ton fichier .env
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId);
        
        if (!order) return res.status(404).json({ message: "Commande introuvable" });

        // Stripe fonctionne en centimes ! (ex: 10.50 € devient 1050 centimes)
        const amount = Math.round(order.totalPrice * 100);

        // On crée l'intention de paiement
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'eur',
            automatic_payment_methods: { enabled: true }, // Active automatiquement Google Pay et Apple Pay !
        });

        // On renvoie la clé secrète temporaire au frontend pour afficher le formulaire
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Met à jour la commande en "Payée" dans la base de données
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            // On sauvegarde les infos envoyées par Stripe ou PayPal (preuve de paiement)
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                email_address: req.body.email_address || req.user.email,
            };

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Commande introuvable" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du paiement" });
    }
};

// 3. Envoie l'ID PayPal au frontend
const getPaypalClientId = (req, res) => {
    res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
};

module.exports = { createStripeIntent, updateOrderToPaid, getPaypalClientId };