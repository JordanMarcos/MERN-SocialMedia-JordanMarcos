// Je prends l'objet Router d'express
const router = require('express').Router();
// Je récupère le controller des posts
const postController = require('../controllers/post.controller');

// Je récupère la biblio multer afin d'utiliser son middleware pour l'upload de fichiers
const multer = require('multer');
const upload = multer();


// CRUD des posts 
// Read
router.get('/', postController.readPost);
// Create
router.post('/', upload.single("file") ,postController.createPost);
// Update 
router.put('/:id', postController.updatePost);
// Delete 
router.delete('/:id', postController.deletePost);
// Like 
router.patch('/like-post/:id', postController.likePost);
// Unlike
router.patch('/unlike-post/:id', postController.unlikePost);


// Comments routes (Table comments dans la table Post thanks NOSQL)
// Create
router.patch('/comment-post/:id', postController.commentPost); 
// Update
router.patch('/edit-comment-post/:id', postController.editCommentPost);
// Delete
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);


// J'exporte mon routeur
module.exports = router;