const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const reservation=require('../models/reservation');
router.get('/', reservationController.getAllReservations);
router.get('/:id/edit',reservationController.renderUpdateReservation);
router.post('/add', reservationController.createReservation);
router.post('/:id/save', reservationController.updateReservation);
router.post('/:id', reservationController.deleteReservation);
router.post('/search', reservationController.searchByDate);
router.get('/add',reservationController.get);
 
module.exports = router;
