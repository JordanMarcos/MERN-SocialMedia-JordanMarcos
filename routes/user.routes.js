// Je prends le router d'express
const router = require('express').Router();

// Je prends les controllers
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

// Authentification
router.post("/register", authController.signUp);


// User DB CRUD
// Récupère tous les users
router.get('/', userController.getAllUsers);

// Récupère les infos d'un seul user
router.get('/:id', userController.userInfo);

// Permet de mettre à jour les données de l'user
router.put('/:id', userController.updateUser);

// Permet de supprimer un User
router.delete('/:id', userController.deleteUser);

// Permet de mettre à jour les données du tableau à l'intérieur d'un user (follow/unfollow)
router.patch('/follow/:id', userController.follow)
router.patch('/unfollow/:id', userController.unfollow)

module.exports = router;