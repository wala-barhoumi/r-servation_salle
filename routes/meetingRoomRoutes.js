const express = require('express');
const router = express.Router();
const meetingRoomController = require('../controllers/meetingRoomController');

router.get('/room/', meetingRoomController.getAllMeetingRooms);
router.get('/room/:id',meetingRoomController.getMeetingRoomById)
router.post('/room/', meetingRoomController.createMeetingRoom);
router.put('/room/:id', meetingRoomController.updateMeetingRoom);
router.delete('/room/:id', meetingRoomController.deleteMeetingRoom);

module.exports = router;
