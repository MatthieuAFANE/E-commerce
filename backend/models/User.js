const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // L'outil pour crypter les mots de passe

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false } // Permet de savoir si c'est toi (le patron)
}, {
    timestamps: true
});

// Magie : Avant de sauvegarder l'utilisateur, on crypte son mot de passe !
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Fonction pour comparer le mot de passe tapé avec celui crypté dans la base
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);