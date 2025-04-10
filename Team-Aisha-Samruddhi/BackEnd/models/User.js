const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
   Name:{
      type: String,
      required: true
   },
   Gender:{
      type: String,
      required: true
   },
   Class:{
      type: String,
      required: true
   },
   EmailID:{
      type: String,
      required: true
   },
   DOB:{
      type: String,
      required: true
   },
   Address:{
      type: String,
      required: true
   },
   Contact:{
      type: String,
      required: true
   },
   FName:{
      type: String,
      required: true
   },
   MName:{
      type: String,
      required: true
   },
   FContact:{
      type: String,
      required: true
   },
   MContact:{
      type: String,
      required: true
   },
   LoginID:{
    type: String,
    required: true,
    unique: true
   },
   Password:{
    type: String,
    required: true
   }
  });
  const User = mongoose.model('user',UserSchema);
  module.exports = User;