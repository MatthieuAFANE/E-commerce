const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Fonction qui génère notre fameux "tampon" (JWT) valable 30 jours
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Inscription d'un nouvel utilisateur
// @route   POST /api/users/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Vérifie si l'email existe déjà
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Cet utilisateur existe déjà" });

        // Crée l'utilisateur
        const user = await User.create({ name, email, password });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id) // On lui donne son tampon direct
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur lors de l'inscription" });
    }
};

// @desc    Connexion d'un utilisateur
// @route   POST /api/users/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // On vérifie si l'utilisateur existe ET si le mot de passe correspond
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur lors de la connexion" });
    }
};

module.exports = { registerUser, loginUser };