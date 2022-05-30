// Je prends mongoose
const mongoose = require('mongoose');

// Je prends le validateur d'email isEmail de la bibliothèque validator
const { isEmail } = require('validator');

// Je prends la bibliothèque bcrypt
const bcrypt = require('bcrypt')

// Ce model correspond à ce que doit ressembler la BDD des users
const userSchema = new mongoose.Schema (

    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
        },
        picture : {
            type: String,
            default: "./uploads/profil/random-user.png"
        },
        bio: {
            type: String,
            max: 1024
        },
        followers: {
            type: [String]
        },
        following: {
            type: [String]
        },
        likes: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
)

// La fonction qui permet de saler (crypter) le mdp avant de le save dans la BDD
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Fonction permet de comparer les mdp cryptés
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth){
            return user
        }
        throw Error('Mot de passe incorrecte')
    }
    throw Error('Mot de passe incorrecte')
}

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;