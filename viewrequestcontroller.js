const FriendRequest = require('../models/sendrequestModel');
const asyncHandler = require('express-async-handler');

const getviewRequests = asyncHandler(async (req, res) => {
  try {
    const { username } = req.params;
    const viewRequests = await FriendRequest.find({ receiverUsername: username }, 'senderusername');

    const senderusername = viewRequests.map(request => request.senderusername);

    res.status(200).json({senderusername});

  } catch (error) {
    // res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
  getviewRequests,
};
