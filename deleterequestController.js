const DeletedRequest = require('../models/deleteModel');
const asyncHandler = require('express-async-handler');
const FriendRequest = require('../models/sendrequestModel');

const deleteRequest = asyncHandler(async (req, res) => {
  try {
    const { senderusername, deletedUsername } = req.body;
    console.log(senderusername, deletedUsername );

    // Find and remove the friend request
    const friendRequest = await FriendRequest.findOne({ senderusername, receiverUsername: deletedUsername });

    if (!friendRequest) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    // Create a new record in the DeletedRequest model
    await DeletedRequest.create({ deletedUsername, senderusername });
    res.status(200).json({ message: 'Friend request deleted successfully' });

  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
  deleteRequest,
};
