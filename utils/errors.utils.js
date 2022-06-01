// Cette fonction permet de gérer et d'informer les cas d'erreurs au moment de l'inscription
module.exports.signUpErrors = (err) => {
    let errors = {
        pseudo: '',
        email: '',
        password: ''
    };

    if (err.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrecte ou déjà pris";

    if (err.message.includes('email'))
        errors.email = "Email incorrect";

    if (err.message.includes('password'))
        errors.password = "Le mot de passe doit faire 6 caractères minimum";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.pseudo = 'Ce pseudo est déjà pris';

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = 'Cet email est déjà enregistré';

    return errors;
};

// Cette fonction permet de gérer et d'informer les cas d'erreurs au moment du login
module.exports.signInErrors = (err) => {
    let errors = {
        email: '',
        password: ''
    };
    // j'ai fait cette alternantive au includes car plus sécurisé : on ne dit pas clairement ce qu'il ne va pas
    // et en plus la manière dont la personne fait sur la vidéo ne marche pas pour moi car (err) contient le throw
    // error de user.model qui dit 'mdp incorrect' donc impossible de matcher avec des includes email ou password
    if (err.message.includes('Mot de passe incorrecte'))
        errors.email = "La combinaison email et mot de passe ne correspondent pas";

    if (err.message.includes('Mot de passe incorrecte'))
        errors.password = "La combinaison email et mot de passe ne correspondent pas";

    return errors;
};