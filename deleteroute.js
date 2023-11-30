const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { deleteRequest } = require('../controllers/deleterequestController');


router.post('/', protect, deleteRequest);

module.exports = router;
