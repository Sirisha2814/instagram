const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createPost, getAllPosts} = require('../controllers/postController');


router.post('/', protect, createPost);
router.get('/', getAllPosts);

module.exports = router;
