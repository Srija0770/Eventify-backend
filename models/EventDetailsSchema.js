const mongoose = require('mongoose');

const eventDetailsSchema = new mongoose.Schema({
  id: {
        type: String,
        required: true,
        unique: true
    },
  title: {
        type: String, 
        required: true, 
        trim: true 
    },
  description: {
        type: String, 
        required: true, 
        trim: true
    },
  category: {
        type: String, 
        required: true, 
        enum: ['Technology', 'Sports', 'Cultural', 'Music', 'Workshops', 'Other'] 
    },
  dateTime: {
        type: Date, 
        required: true 
    },
  venueType: {
        type: String, 
        required: true, 
        enum: ['online', 'offline'] 
    },
  venue: {
        type: String, 
        required: true, 
        trim: true 
    },
  deadline: {
        type: Date, 
        required: true 
    },
  imageUrl: { 
        type: String, 
        required: true, 
        trim: true
    }
}, { timestamps: true });

const EventDetails = mongoose.model('EventDetails', eventDetailsSchema);
module.exports = EventDetails;