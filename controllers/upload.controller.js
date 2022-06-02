// Je récupère UserModel
const UserModel = require('../models/user.model');
// Biblio natif à nodeJS pour incrémenter des élèments dans des fichiers
const fs = require('fs');

// Je récup la biblio natif promisify
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
// Je récup la fonction qui gère erreur upload file
const { uploadErrors } = require('../utils/errors.utils');

// Ma fonction uploadProfil 
module.exports.uploadProfil = async (req, res) => {
    // Ce try catch vérifie la taille de l'image 
    try {
        if (
            req.file.detectedMimeType !== "image/jpg" && 
            req.file.detectedMimeType !== "image/png" && 
            req.file.detectedMimeType !== "image/jpeg"
        )
            throw Error("Fichier invalide");

        if (req.file.size > 500000) throw Error("Taille maximale");
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({errors});
    };

    // Pour que chaque photo soit unique et au format jpg
    const fileName = req.body.name + ".jpg";
    
    // Créer un fichier avec un chemin avec la biblio fs
    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    ); 
};