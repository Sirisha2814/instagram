const FriendRequest = require('../models/sendrequestModel');
const asyncHandler = require('express-async-handler');
// Create a friend request
const sendFriendRequest = asyncHandler(async (req, res) => {
  try {
    const {receiverUsername,senderusername} = req.body;
    // console.log(receiverUsername,senderusername);
    const existingRequest = await FriendRequest.findOne({receiverUsername,senderusername});

    if (existingRequest) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    // Create a new friend request
    const friendRequest = new FriendRequest({receiverUsername,senderusername});

    await friendRequest.save();

    res.status(201).json({ message: 'Friend request sent successfully' });
  } catch (error) {
    // res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all friend requests
const getFriendRequests = asyncHandler(async(req, res) => {
  try {
    const friendRequests = await FriendRequest.find({});

    res.status(200).json({ friendRequests });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
  sendFriendRequest,
  getFriendRequests,
};
