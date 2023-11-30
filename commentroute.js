const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addComment, getCommentsForPost } = require('../controllers/commentController');


router.post('/', protect, addComment);
router.get('/', getCommentsForPost);

module.exports = router;
