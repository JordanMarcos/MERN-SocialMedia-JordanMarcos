// Je prends le router d'express
const router = require('express').Router();

// Je prends les controllers
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

// Authentification
router.post("/register", authController.signUp);

// User DB
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);

module.exports = router;