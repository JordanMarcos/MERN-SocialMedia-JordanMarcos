// Je récupère la bibliothèque mongoose pour travailler avec mongodb
const mongoose = require('mongoose');

// Je créer le modèle de la BDD des comments / posts
const PostSchema = new mongoose.Schema(
    {
        posterId: {
            type : String,
            required : true
        },
        message: {
            type : String,
            trim : true, 
            maxlength : 500
        },
        picture: {
            type : String
        },
        video: {
            type : String,
        },
        likers: {
            type : [String],
            required : true,
        },
        comment: {
            type : [
                {
                    commenterId : String,
                    commenterPseudo : String,
                    text : String,
                    timestamp : Number
                }
            ],
            required : true
        }
    },
    {
        timestamps: true
    }
);

// J'exporte le model PostSchema
module.exports = mongoose.model('post', PostSchema);