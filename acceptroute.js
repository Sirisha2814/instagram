const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { acceptRequest } = require('../controllers/acceptrequestController');


router.post('/', protect, acceptRequest);

module.exports = router;
