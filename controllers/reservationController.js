const Reservation = require('../models/reservation');
const options = {
    new: true,
    lean: true,
    includeResultMetadata: true
};

exports.createReservation = async (req, res) => {
    try {
        const { user, meetingRoom, startTime, endTime } = req.body;

        // Check if the meeting room is available for the specified time
        const existingReservation = await Reservation.findOne({
            meetingRoom: meetingRoom,
            $or: [
                { $and: [{ startTime: { $lt: endTime } }, { endTime: { $gt: startTime } }] }, // New reservation starts before existing ends
                { startTime: { $gte: startTime, $lt: endTime } }, // New reservation starts during existing
                { endTime: { $gt: startTime, $lte: endTime } } // New reservation ends during existing
            ]
        });


        if (existingReservation) {
            return res.status(400).json({ error: 'The meeting room is already booked for the specified time.' });
        }

        // Create new reservation
        const reservation = new Reservation({
            user: user,
            meetingRoom: meetingRoom,
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
        // Fetch all reservations from the database
        const reservations = await Reservation.find().populate('user').populate('meetingRoom');
        res.status(200).json(reservations);
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
            options
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
