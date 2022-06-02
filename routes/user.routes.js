// Je prends le router d'express
const router = require('express').Router();

// Je prends les controllers
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');

// Je récupère la biblio multer afin d'utiliser son middleware pour l'upload de fichiers
const multer = require('multer');
const upload = multer();

// Authentification
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);


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


// Upload files
router.post('/upload', upload.single('file'), uploadController.uploadProfil);


module.exports = router;