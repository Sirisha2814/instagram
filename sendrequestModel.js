const mongoose = require('mongoose');

const requestSchema = mongoose.Schema(
  {  
    
    receiverUsername:{
        type:String,
    },
    senderusername:{
      type:String,
  },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('FriendRequest', requestSchema);
