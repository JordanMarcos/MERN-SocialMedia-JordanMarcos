// Ce controller fait l'inscription, la connexion et la déconnexion de l'user

// Je prends l'user model
const UserModel = require('../models/user.model');

// Je prends JWT
const jwt = require('jsonwebtoken');

// Je prends la fonction signUpErrors et signInErrors
const {
    signUpErrors, 
    signInErrors
} = require('../utils/errors.utils');


// Je donne une durée de vie maximale de 3 jours au cookie
const maxAge = 3 * 24 * 60 * 60 * 1000

// Fonction qui créer les tokens
const createToken = (id) => {
    return jwt.sign({
        id
    }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};


// Je créer et export le controller signUp
module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const {
        pseudo,
        email,
        password
    } = req.body;

    try {
        const user = await UserModel.create({
            pseudo,
            email,
            password
        });
        res.status(201).json({
            user: user._id
        });
    } catch (err) {
        const errors = signUpErrors(err);
        res.status(200).send({
            errors
        });
    }
};

// Je créer et export le controller signIn
module.exports.signIn = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge
        });
        res.status(200).json({
            user: user._id
        });
    } catch (err) {
        const errors = signInErrors(err);
        res.status(200).json({
            errors
        });
    }
};

// Je créer et export le controller logout
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1
    });
    res.redirect('/');
};