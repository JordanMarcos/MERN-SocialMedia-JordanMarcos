// Je prends la bibliothèque mongoose pour travailler avec MongoDB
const mongoose = require("mongoose");

// Je me connecte à la BDD de MongoDB via la variable d'environement
mongoose
    .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@mern-project.jxp2o.mongodb.net/mern-project", 
        // Je ne peux pas mettre ces options car ma version de mongoDB ne les prend plus en charge
        // {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false
        // }
    )
    .then(() => console.log('Connecté à MongoDB'))
    .catch((err) => console.log('Impossible de se connecter à MongoDB', err));