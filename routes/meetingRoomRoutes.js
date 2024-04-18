const express = require('express');
const router = express.Router();
const meetingRoomController = require('../controllers/meetingRoomController');
const MeetingRoom = require('../models/meetingRoom'); // Adjust the path as needed

router.get('/', meetingRoomController.getAllMeetingRooms);
router.get('/findbyname',meetingRoomController.getMeetingRoomByName);
router.post('/', meetingRoomController.createMeetingRoom);
router.post('/:id/save', meetingRoomController.updateMeetingRoom);
router.post('/:id', meetingRoomController.deleteMeetingRoom);
router.get('/:id/edit',meetingRoomController.getMeetingRoomform);


module.exports = router;
