const mongoose = require('mongoose');
const {Schema} = mongoose;

const Contact = new Schema({
    Name:{
       type: String,
       required: true
    },
    EmailID:{
       type: String,
       required: true
    },
    Message:{
        type: String,
        required: true
     },
     SubmissionDate: {
      type: Date,
      default: Date.now
  }
});
const contact = mongoose.model('contact',Contact);
module.exports = contact;

