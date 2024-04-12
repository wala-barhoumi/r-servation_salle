const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:false },
    meetingRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'MeetingRoom', required: false },
    startTime: { type: Date, required: false },
    endTime: { type: Date, required: false }
});

module.exports = mongoose.model('reservation', reservationSchema);
