// Je prends express 
const express = require('express');

// Je donne le chemin à dotenv pour accéder aux variables d'environements
require('dotenv').config({path: './config/.env'})

// 'App' devient express() 
const app = express();

// Je demande à Express d'écouter sur le port déclaré dans les var d'environements
app.listen(process.env.PORT, () => {
    console.log(`J'écoute sur le port ${process.env.PORT} `);
})