// Ce controller fait l'inscription, la connexion et la déconnexion de l'user

// Je prends l'user model
const userModel = require('../models/user.model');

// Je créer et export le controller signUp
module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const {pseudo, email, password} = req.body;

    try {
        const user =  await userModel.create({pseudo, email, password});
        res.status(201).json({ user: user._id});
    }
    catch(err) {
        res.status(200).send({ err })
    }
}