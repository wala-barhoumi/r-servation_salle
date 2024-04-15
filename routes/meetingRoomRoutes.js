const express = require('express');
const router = express.Router();
const meetingRoomController = require('../controllers/meetingRoomController');

router.get('/', meetingRoomController.getAllMeetingRooms);
router.get('/:id',meetingRoomController.getMeetingRoomById)
router.post('/', meetingRoomController.createMeetingRoom);
router.put('/:id', meetingRoomController.updateMeetingRoom);
router.post('/:id', meetingRoomController.deleteMeetingRoom);

module.exports = router;
