// Je récupère la bibliothèque JWT
const jwt = require('jsonwebtoken');

// Je récupère le userModel
const UserModel = require('../models/user.model');

// Middleware qui permet de tester si l'user est conneté tout au long de sa navigation avec JWT
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', {
                    maxAge: 1
                });
                next();
            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
};

// Middleware qui permet la toute première identification de l'user
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log('Pas de token dans auth.middleware f requireAuth' + token);
    }
};