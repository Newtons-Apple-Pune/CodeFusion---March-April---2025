const mongoose = require('mongoose');
const { Schema } = mongoose;

const RegisterSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    EmailID: {
        type: String,
        required: true
    },
    Class: {
        type: String,
        required: true
    },
    Course: {
        type: String,
        required: true
    },
    Contact: {
        type: String,
        required: true
    },
    Percentage: {
        type: String,
        required: true
    },
    Institute: {
        type: String,
        required: true
    },
    SubmissionDate: {
        type: Date,
        default: Date.now
    }
});

const Register = mongoose.model('register', RegisterSchema);
module.exports = Register;
