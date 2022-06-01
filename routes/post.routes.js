// Je prends l'objet Router d'express
const router = require('express').Router();

// Je récupère le controller des posts
const postController = require('../controllers/post.controller');


// CRUD des posts 

// Read
router.get('/', postController.readPost);

// Create
router.post('/', postController.createPost);

// Update 
router.put('/:id', postController.updatePost);

// Delete 
router.delete('/:id', postController.deletePost);


// J'exporte mon routeur
module.exports = router;