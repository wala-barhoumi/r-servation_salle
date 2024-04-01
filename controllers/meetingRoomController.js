const MeetingRoom = require('../models/meetingRoom');

exports.getAllMeetingRooms = async (req, res) => {
    try {
        const meetingRooms = await MeetingRoom.find();
        res.render('meetingRooms',{meetingRooms});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMeetingRoomById = async (req, res) => {
    try {
        const meetingRoom = await MeetingRoom.findById(req.params.id);
        if (!meetingRoom) {
            return res.status(404).json({ message: 'Meeting room not found' });
        }
        res.status(200).json(meetingRoom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createMeetingRoom = async (req, res) => {
    const meetingRoom = new MeetingRoom({
        name: req.body.name,
        capacity: req.body.capacity,
        amenities: req.body.amenities,
        availability: req.body.availability || true // Set default to true if not provided
    });
    try {
        const newMeetingRoom = await meetingRoom.save();
        res.status(201).json(newMeetingRoom);
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
        const updatedMeetingRoom = await meetingRoom.save();
        res.status(200).json(updatedMeetingRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMeetingRoom = async (req, res) => {
    try {
        const meetingRoom = await MeetingRoom.findById(req.id);
        if (!meetingRoom) {
            return res.status(404).json({ message: 'Meeting room not found' });
        }
        await meetingRoom.remove();
        res.status(200).json({ message: 'Meeting room deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
