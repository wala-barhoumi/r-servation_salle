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

        const meetingRoom = await MeetingRoom.find()
        res.render('reservation', { reservation: reservations, meetingRoom: meetingRoom });
        console.log(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'An error occurred while fetching reservations.' });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        // Extract reservation ID and updated data from request
        const { id } = req.params;
        const { startTime, endTime } = req.body;

        // Validate input data
        if (!id || !startTime || !endTime) {
            return res.status(400).json({ error: 'Invalid input data.' });
        }

        // Find the reservation by ID and update its start and end times
        const reservation = await Reservation.findByIdAndUpdate(
            id,
            { startTime, endTime },
            { new: true }
        );

        // Check if the reservation exists
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found.' });
        }

        // Fetch all reservations to render the updated view
        const reservations = await Reservation.find();


        const meetingRoom = await MeetingRoom.find()
        res.render('reservation', { reservation: reservations, meetingRoom: meetingRoom });

    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ error: 'An error occurred while updating the reservation.' });
    }
};

exports.renderUpdateReservation = async (req, res) => {
    try {
        // Extract reservation ID from request parameters
        const { id } = req.params;

        // Find the reservation by ID
        const reservation = await Reservation.findById(id);

        // Check if the reservation exists
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found.' });
        }

        // Render the update reservation view and pass reservation data
        res.render('updateReservation', { reservation });
    } catch (error) {
        console.error('Error rendering update reservation view:', error);
        res.status(500).json({ error: 'An error occurred while rendering the update reservation view.' });
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
        const updateReservation = await Reservation.find();
        const meetingRoom = await MeetingRoom.find()
        res.render('reservation', { reservation: updateReservation , meetingRoom:meetingRoom}); // Corrected variable name
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).json({ error: 'An error occurred while deleting the reservation.' });
    }


};
exports.searchByDate=async (req,res)=>{

    try {
        const { date } = req.body;

        // Validate input
        if (!date) {
            return res.status(400).json({ error: 'Date is required.' });
        }

        // Find reservations for the specified date
        const reservation = await Reservation.find({ startTime: { $gte: date } });

        // Return the reservations found
        res.status(200).json({ reservation });

    } catch (error) {
        console.error('Error searching reservations by date:', error);
        res.status(500).json({ error: 'An error occurred while searching reservations by date.' });
    }
};
/*const moment = require('moment');

exports.renderCalendar = async (req, res) => {
    try {
        // Get the current month and year
        const currentMonth = moment().month() + 1; // Adding 1 to get the correct month number (1-based index)
        const currentYear = moment().year();

        // Get the first day of the current month
        const firstDayOfMonth = moment().startOf('month');

        // Get the last day of the current month
        const lastDayOfMonth = moment().endOf('month');

        // Fetch reservations for the current month
        const reservations = await Reservation.find({
            startTime: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
        }).populate('meetingRoom');

        // Render the calendar view and pass the reservations data
        res.render('calendar', { reservations, currentMonth, currentYear });
    } catch (error) {
        console.error('Error rendering calendar:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.getCalendar=async  (req, res) => {
    res.render('calendar');
};*/