const mongoose = require('mongoose');

const receiveSchema = mongoose.Schema(
  {  
    senderusername:{
        type:String,
        ref:'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Viewrequest', receiveSchema);
