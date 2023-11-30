const AcceptedRequest = require('../models/acceptModel');
const FriendRequest = require('../models/sendrequestModel');
const asyncHandler = require('express-async-handler');

const acceptRequest = asyncHandler(async (req, res) => {
  try {
    const { senderusername, acceptedUsername } = req.body;
    // console.log(senderusername, acceptedUsername);

    // Find the friend request
    const friendRequest = await FriendRequest.findOne({ senderusername, receiverUsername: acceptedUsername });

    if (!friendRequest) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    // Create a new record in the AcceptedRequest model
    await AcceptedRequest.create({ acceptedUsername, senderusername });

    // Add logic to update your actual friend list in a real application
    res.status(200).json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    console.error('Error accepting request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
  acceptRequest,
};
