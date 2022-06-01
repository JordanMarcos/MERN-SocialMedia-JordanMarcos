// Je prends express 
const express = require('express');

// Je prends body-parser
const bodyParser = require('body-parser');

// Je prends cookie-parser pour pouvoir lire les cookie avec nodeJS
const cookieParser = require('cookie-parser');

// Je prends les routes
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

// Je donne le chemin à dotenv pour accéder aux variables d'environements
require('dotenv').config({path: './config/.env'});

// Je prends db.js pour accéder à la BDD
require('./config/db');

// Je prends les middlewares checkUser et requireAuth
const {checkUser, requireAuth} = require('./middleware/auth.middleware');

// 'App' devient express() 
const app = express();

// J'utiliser bodyParser pour pouvoir traiter les requetes du body (req.body)
app.use(bodyParser.json());

// J'utiliser bodyParser pour pouvoir lire les req.params (url)
app.use(bodyParser.urlencoded({extended: true}));

// J'utilise cookieParser afin de pouvoir lire les cookies avec nodeJS
app.use(cookieParser());

// Middleware pour vérifier le token jwt de l'user sur toutes les requetes 
app.get('*', checkUser);

//Middleware pour vérifier la premiere connexion de l'user
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post',postRoutes);

// Server : je demande à Express d'écouter sur le port déclaré dans les var d'environements
app.listen(process.env.PORT, () => {
    console.log(`J'écoute sur le port ${process.env.PORT} `);
})