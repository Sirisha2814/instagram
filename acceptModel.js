const mongoose = require('mongoose');

const acceptedRequestSchema = new mongoose.Schema({
  senderusername: {
    type: String,
    required: true,
  },
  acceptedUsername: {
    type: String,
    required: true,
  },
  acceptedAt: {
    type: Date,
    default: Date.now,
  },
});

const AcceptedRequest = mongoose.model('AcceptedRequest', acceptedRequestSchema);

module.exports = AcceptedRequest;
