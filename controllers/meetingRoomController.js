const MeetingRoom = require('../models/meetingRoom');

exports.getAllMeetingRooms = async (req, res) => {
    try {
        const meetingRoom = await MeetingRoom.find();
        res.render('meetingRoom', { meetingRoom});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMeetingRoomByName = async (req, res) => {
    try {
            const decodedRoomName = decodeURIComponent(req.query.name);
        const meetingRoom = await MeetingRoom.find({ name: decodedRoomName });



        res.status(200).render('meetingRoom', {  meetingRoom });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Conference%20Room%20A


exports.createMeetingRoom = async (req, res) => {
    const meetingRoom = new MeetingRoom({
        name: req.body.name,
        capacity: req.body.capacity,
        amenities: req.body.amenities,
        availability: req.body.availability || true // Set default to true if not provided
    });
    try {
        const newMeetingRoom = await meetingRoom.save();
        // After creating a new meeting room, fetch the updated list of meeting rooms
        const updatedMeetingRoom = await MeetingRoom.find();
        // Render the updated meeting room list
        res.status(201).render('meetingRoom', { meetingRoom: updatedMeetingRoom });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateMeetingRoom = async (req, res) => {
    try {
        const meetingRoom = await MeetingRoom.findById(req.params.id);
        if (!meetingRoom) {
            return res.status(404).json({ message: 'Meeting room not found' });
        }

        // Update meeting room properties if provided in the request body
        if (req.body.name != null) {
            meetingRoom.name = req.body.name;
        }
        if (req.body.capacity != null) {
            meetingRoom.capacity = req.body.capacity;
        }
        if (req.body.amenities != null) {
            meetingRoom.amenities = req.body.amenities;
        }
        if (req.body.availability != null) {
            meetingRoom.availability = req.body.availability;
        }

        // Save the updated meeting room
        await meetingRoom.save();

        // Fetch the updated meeting room after saving
        const updatedMeetingRoom = await MeetingRoom.find();

        // Render the updated meeting room
        res.render('meetingRoom', { meetingRoom: updatedMeetingRoom });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMeetingRoomform=async (req,res)=>{
    try {
        const meetingRoom = await MeetingRoom.findById(req.params.id);
        if (!meetingRoom) {
            return res.status(404).json({ message: 'Meeting room not found' });
        }
        res.render('updateMeetingRoom', { meetingRoom: meetingRoom });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteMeetingRoom = async (req, res) => {
    try {
        // Find the meeting room by ID
        const meetingRoom = await MeetingRoom.findById(req.params.id);

        // Check if the meeting room exists
        if (!meetingRoom) {
            return res.status(404).json({ message: 'Meeting room not found' });
        }

        // Remove the meeting room
        await meetingRoom.deleteOne();

        // After deletion, fetch updated meeting rooms
        const updatedMeetingRoom = await MeetingRoom.find();

        // Render the updated meeting room list
        res.render('meetingRoom', { meetingRoom: updatedMeetingRoom });

    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: error.message });
    }
}
exports.addRoomForm=async (req,res)=>{
    res.render('addmeetingroom');
}