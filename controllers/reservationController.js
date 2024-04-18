const Reservation = require('../models/reservation');
const MeetingRoom = require('../models/meetingRoom');
const User = require('../models/user.js');
const exec = require("nodemon/lib/config/exec");


exports.createReservation = async (req, res) => {
    try {
        const { user, selectedMeetingRoom, startTime, endTime } = req.body;

        // Check if the meeting room is available for the specified time
        const existingReservation = await Reservation.findOne({
            meetingRoom: selectedMeetingRoom,
            $or: [
                { $and: [{ startTime: { $lt: endTime } }, { endTime: { $gt: startTime } }] },
                { startTime: { $gte: startTime, $lt: endTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ]
        });

        if (existingReservation) {
            return res.status(400).json({ error: 'The meeting room is already booked for the specified time.' });
        }

        // Create new reservation
        const reservation = new Reservation({
            user: user,
            meetingRoom: selectedMeetingRoom,
            startTime: startTime,
            endTime: endTime
        });

        await reservation.save();

        res.status(201).json({ message: 'Reservation created successfully', reservation: reservation });
    } catch (err) {
        console.error('Error creating reservation:', err);
        res.status(500).json({ error: 'An error occurred while creating the reservation.' });
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        // Fetch all reservations from the database and populate 'user' and 'meetingRoom' fields
        const reservations = await Reservation.find()
            .populate({ path: 'user', select: 'email' })
            .populate({path:'meetingRoom',select:'name'})
            .exec();

        const meetingRooms = await MeetingRoom.find()
        res.render('reservation', { reservation: reservations, meetingRoom: meetingRooms });
        console.log(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'An error occurred while fetching reservations.' });
    }
};



exports.updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const { startTime, endTime } = req.body;

        // Validate input
        if (!id || !startTime || !endTime) {
            return res.status(400).json({ error: 'Invalid input data.' });
        }

        // Find the reservation by ID and update its startTime and endTime
        const reservation = await Reservation.findByIdAndUpdate(
            id,
            { startTime: startTime, endTime: endTime },
            { new: true, lean: true, includeResultMetadata: true }
        );

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found.' });
        }

        res.status(200).json({ message: 'Reservation updated successfully', reservation });
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ error: 'An error occurred while updating the reservation.' });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate input
        if (!id) {
            return res.status(400).json({ error: 'Invalid reservation ID.' });
        }

        // Find the reservation by ID and delete it
        const reservation = await Reservation.findByIdAndDelete(id);

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found.' });
        }

        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).json({ error: 'An error occurred while deleting the reservation.' });
    }
};
