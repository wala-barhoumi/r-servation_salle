const mongoose = require('mongoose');

const meetingRoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    amenities: [String],
    availability: { type: Boolean, default: true }
});

module.exports = mongoose.model('MeetingRoom', meetingRoomSchema);
