const mongoose = require('mongoose');
const {Schema} = mongoose;

const TeacherLogin = new Schema({
    Name:{
       type: String,
       required: true
    },
    Gender:{
       type: String,
       required: true
    },
    Education:{
       type: String,
       required: true
    },
    EmailID:{
       type: String,
       required: true
    },
    JoinDate:{
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
    AlternateContact:{
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
const Teacher = mongoose.model('teacher',TeacherLogin);
module.exports = Teacher;

