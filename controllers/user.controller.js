// Je récupère la BDD MongoDB
const UserModel = require('../models/user.model');

// Je récupère ObjectID pour controller les ID
const ObjectID = require('mongoose').Types.ObjectId;

// Fonction permettant de récup tous les users sans le mdp
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

// Fonction permettant de récup les infos d'un seul User
module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status (400).send('ID inconnu : ' + req.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID inconnu : ' + err);
    }).select('-password');    
};

// Fonction permettant de mettre à jour les données de l'user
module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
     return res.status (400).send('ID inconnu : ' + req.params.id)

    try{
        await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio
                }
            },
            {new: true, upsert: true, setDefaultsOnInsert: true}, 
        ) 
        // j'utilise un .then car si je fais comme il fait dans la vidéo, le server crash car version de Mongo que 
        // j'ai doit utiliser le .then, regarde : https://stackoverflow.com/questions/69090486/nodejs-express-mongodb-err-http-headers-sent
            .then((docs) => res.send(docs))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(500).json({ message : err });
    }
}; 


// Fonction permettant de supprimer un User
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status (400).send('ID inconnu : ' + req.params.id)

    try{
        await UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message : "L'utilisateur à été supprimé"});
    } 
    catch (err) {
        return res.status(500).json({ message : err });
    }
};


// Fonction permettant de mettre à jour les follows d'un user
module.exports.follow = async (req,res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
    return res.status(400).send('ID inconnu : ' + req.params.id)

    try{
        // Add to the follower list
        await UserModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {following: req.body.idToFollow}},
            { new: true, upsert: true },
                (err, docs) => {
                    if (!err) res.status(201).json(docs);
                    else return res.status(400).json(err);
                }
        // j'utilise le .then car dans la version mongo que j'utilise il est obligé d'utilisé .then si deux instructions
        ).then( 
            // Add to following list 
            await UserModel.findByIdAndUpdate(
                req.body.idToFollow,
                {$addToSet: {followers: req.params.id}},
                { new: true, upsert: true },
                (err, docs) => {
                    if (err) return res.status(400).json(err);
                }
            ));
       
    } 
    catch (err) {
         console.error('Erreur du try catch userController follow : ' + err);
    }
};

// Fonction permettant de mettre à jour les unfollows d'un user
module.exports.unfollow = async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status (400).send('ID inconnu : ' + req.params.id)

    try{

    } 
    catch (err) {
        return res.status(500).json({ message : err });
    }
}