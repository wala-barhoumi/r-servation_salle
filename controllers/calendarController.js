// Import necessary modules
const Reservation = require('../models/reservation'); // Adjust the path as per your project structure
const moment = require('moment');

// Controller function to render the calendar
exports.getCalendar = async (req, res) => {
    try {
        // Fetch reservations data from the database
        const reservations = await Reservation.find();

        // Render the 'calendar' view with reservations data and moment module
        res.render('calendar', { reservations, moment });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
