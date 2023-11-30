const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {sendFriendRequest,getFriendRequests} = require('../controllers/sendrequestController');


router.post('/', protect,sendFriendRequest);
router.get('/',protect,getFriendRequests)

module.exports = router;
