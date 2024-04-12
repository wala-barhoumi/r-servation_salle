const express = require('express');
const router = express.Router();
const meetingRoomController = require('../controllers/meetingRoomController');

router.get('/meetingRoom/', meetingRoomController.getAllMeetingRooms);
router.get('/meetingRoom/:id',meetingRoomController.getMeetingRoomById)
router.post('/meetingRoom/', meetingRoomController.createMeetingRoom);
router.put('/meetingRoom/:id', meetingRoomController.updateMeetingRoom);
router.delete('/meetingRoom/:id', meetingRoomController.deleteMeetingRoom);

module.exports = router;
