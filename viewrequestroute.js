const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getviewRequests } = require('../controllers/viewrequestcontroller');


router.get('/:username',protect,getviewRequests);

module.exports = router;
