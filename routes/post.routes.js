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

// Like 
router.patch('/like-post/:id', postController.likePost);

// Unlike
router.patch('/unlike-post/:id', postController.unlikePost);

// J'exporte mon routeur
module.exports = router;