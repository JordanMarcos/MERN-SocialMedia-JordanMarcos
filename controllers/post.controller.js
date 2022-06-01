// Je prends postModel table
const PostModel = require('../models/post.model');

// Je prends UserModel table
const UserModel = require('../models/user.model');

// Je prends ObjectID pour vérifier l'existence du param en BDD
const ObjectID = require('mongoose').Types.ObjectId;


// CRUD controllers
// READ 
module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Erreur lors de la récupération de la data : ' + err);
    }).sort({ createdAt: -1 });
};

// CREATE 
module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: []
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
};

// UPDATE 
module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id);

    const updatedRecord = {
        message: req.body.message
    };

    PostModel.findByIdAndUpdate(
        req.params.id, {
            $set: updatedRecord
        }, {
            new: true
        },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Erreur Update : " + err);
        }
    )
};

// DELETE 
module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id);

    PostModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Erreur Delete : " + err);
        }
    )
};

// Like 
module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id);


    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true},
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
            // j'utilise .clone() à la fin car la version de mongoDB que j'ai ne peut pas fonctioner sans celle-ci,
            // lorsque je fais deux fois le même objet de requete il crash, donc important d'utililser .clone()
            // https://stackoverflow.com/questions/68945315/mongooseerror-query-was-already-executed
        ).clone().catch(function(err){console.log(err);});

        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            { new: true },
            (err,docs) =>  {
                if (!err) res.send(docs)
                else return res.status(400).send(err);
            }
            // j'utilise .clone() à la fin car la version de mongoDB que j'ai ne peut pas fonctioner sans celle-ci,
            // lorsque je fais deux fois le même objet de requete il crash, donc important d'utililser .clone()
            // https://stackoverflow.com/questions/68945315/mongooseerror-query-was-already-executed
        ).clone().catch(function(err){console.log(err);})
    } catch (err) {
        return res.status(400).send(err);
    }   
};

// Unlike
module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id);

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id, {
                $pull: {
                    likers: req.body.id
                }
            }, {
                new: true
            },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
            // j'utilise .clone() à la fin car la version de mongoDB que j'ai ne peut pas fonctioner sans celle-ci,
            // lorsque je fais deux fois le même objet de requete il crash, donc important d'utililser .clone()
            // https://stackoverflow.com/questions/68945315/mongooseerror-query-was-already-executed
        ).clone().catch(function (err) {
            console.log(err);
        });

        await UserModel.findByIdAndUpdate(
            req.body.id, {
                $pull: {
                    likes: req.params.id
                }
            }, {
                new: true
            },
            (err, docs) => {
                if (!err) res.send(docs)
                else return res.status(400).send(err);
            }
            // j'utilise .clone() à la fin car la version de mongoDB que j'ai ne peut pas fonctioner sans celle-ci,
            // lorsque je fais deux fois le même objet de requete il crash, donc important d'utililser .clone()
            // https://stackoverflow.com/questions/68945315/mongooseerror-query-was-already-executed
        ).clone().catch(function (err) {
            console.log(err);
        })
    } catch (err) {
        return res.status(400).send(err);
    }
};

// Create post controller
module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id);

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comment: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    },
                },
            }, 
            { new:true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            },
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

// Update post controller
module.exports.editCommentPost = (req, res) => {

};

// Delete post controller
module.exports.deleteCommentPost = (req, res) => {

};