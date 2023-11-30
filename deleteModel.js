const mongoose = require('mongoose');

const deletedRequestSchema = new mongoose.Schema({
  senderusername: {
    type: String,
    required: true,
  },
  deletedUsername: {
    type: String,
    required: true,
  },
  deletedAt: {
    type: Date,
    default: Date.now,
  },
});

const DeletedRequest = mongoose.model('DeletedRequest', deletedRequestSchema);

module.exports = DeletedRequest;
