// @desc    Récupérer le suivi d'un colis via API transporteur (Proxy)
// @route   GET /api/tracking/:carrier/:trackingNumber
// @access  Public
const getTrackingInfo = async (req, res) => {
    try {
        const { carrier, trackingNumber } = req.params;

        // ⚠️ EN PRODUCTION : C'est ici que tu utiliseras axios.get() pour interroger 
        // l'API officielle de La Poste ou Mondial Relay avec ta clé secrète (process.env.API_KEY).
        
        // Pour le développement, on simule une réponse de l'API après 1 seconde :
        setTimeout(() => {
            // Si le numéro est trop court, on simule une erreur
            if(trackingNumber.length < 5) {
                return res.status(404).json({ message: "Numéro de suivi invalide ou introuvable." });
            }

            res.json({
                trackingNumber,
                carrier: carrier,
                status: "En transit",
                estimatedDelivery: "3 Juillet 2026", // Date simulée
                events: [
                    { id: 1, date: "30 Juin 2026 - 08:30", location: "Entrepôt AirUp", status: "Colis en cours de préparation", done: true },
                    { id: 2, date: "30 Juin 2026 - 15:45", location: "Plateforme Logistique", status: `Pris en charge par ${carrier}`, done: true },
                    { id: 3, date: "1 Juillet 2026 - 09:12", location: "Centre de tri Régional", status: "En transit vers votre point de livraison", done: true },
                    { id: 4, date: null, location: "Point Relais / Domicile", status: "Livraison en attente", done: false }
                ]
            });
        }, 1000); // 1 seconde de faux chargement pour voir l'animation

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la communication avec le transporteur." });
    }
};

module.exports = { getTrackingInfo };