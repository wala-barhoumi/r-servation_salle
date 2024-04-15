const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const reservation=require('../models/reservation');
router.get('/reservation/', reservationController.getAllReservations);
router.post('/reservation/', reservationController.createReservation);
router.put('/reservation/:id', reservationController.updateReservation);
router.delete('/reservation/:id', reservationController.deleteReservation);

module.exports = router;
