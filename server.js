// Je prends express 
const express = require('express');

// Je prends body-parser
const bodyParser = require('body-parser');

// Je prends les routes
const userRoutes = require('./routes/user.routes');

// Je donne le chemin à dotenv pour accéder aux variables d'environements
require('dotenv').config({path: './config/.env'});

// Je prends db.js pour accéder à la BDD
require('./config/db');

// 'App' devient express() 
const app = express();

// J'utiliser bodyParser pour pouvoir traiter les requetes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/api/user', userRoutes);


// Server : je demande à Express d'écouter sur le port déclaré dans les var d'environements
app.listen(process.env.PORT, () => {
    console.log(`J'écoute sur le port ${process.env.PORT} `);
})