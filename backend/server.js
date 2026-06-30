const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const podRoutes = require('./routes/podRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Route de test simple
app.get('/', (req, res) => {
    res.send('Serveur E-commerce Air Up opérationnel ! 💧');
});

// <-- 2. UTILISATION DES ROUTES -->
app.use('/api/pods', podRoutes); 
// À chaque fois que le frontend appellera /api/pods, le serveur ira chercher podRoutes.js

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});