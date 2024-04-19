

const Reservation = require('../models/reservation');
const moment = require('moment');

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

// Export the renderCalendar function
module.exports = exports;