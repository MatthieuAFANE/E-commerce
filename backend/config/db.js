const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ Base de données MongoDB connectée : ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Erreur de connexion MongoDB : ${error.message}`);
        process.exit(1); // On arrête le serveur si la base de données plante
    }
};

module.exports = connectDB;