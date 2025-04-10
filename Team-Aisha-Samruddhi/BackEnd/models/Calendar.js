const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  description: String,
  EventType:String,
  EventLocation:String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
