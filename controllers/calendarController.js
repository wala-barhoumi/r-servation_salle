
const Reservation = require('../models/reservation'); 
const moment = require('moment');

exports.getCalendar = async (req, res) => {
    try {
       
        const reservations = await Reservation.find();

        
        res.render('calendar', { reservations, moment });
    } catch (error) {
       
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

