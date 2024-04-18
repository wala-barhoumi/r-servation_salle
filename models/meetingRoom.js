const mongoose = require('mongoose');

const meetingRoomSchema = new mongoose.Schema({
    name: { type: String, required: false  },
    capacity: { type: Number, required: false },
    amenities: [String],
    availability: { type: Boolean, default: false }
});

module.exports = mongoose.model('meetingRoom', meetingRoomSchema);
