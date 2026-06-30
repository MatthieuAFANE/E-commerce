const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Si la requête contient un header "Authorization" qui commence par "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // On récupère juste le token (on enlève le mot "Bearer ")
            token = req.headers.authorization.split(' ')[1];

            // On vérifie que le token a bien été signé avec notre JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // On trouve l'utilisateur correspondant et on le stocke dans req.user (sans son mot de passe)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // On le laisse passer !
        } catch (error) {
            res.status(401).json({ message: "Non autorisé, le tampon est invalide ou expiré." });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Non autorisé, vous n'avez pas de tampon (token)." });
    }
};

module.exports = { protect };