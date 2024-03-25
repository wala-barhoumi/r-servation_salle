const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/reserve', reservationController.createReservation);
router.get('/reservations', reservationController.getAllReservations);

module.exports = router;
