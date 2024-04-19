// routes/calendar.js
const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController'); // Corrected path

router.get('/', calendarController.getCalendar); // Endpoint for rendering the calendar

module.exports = router;
