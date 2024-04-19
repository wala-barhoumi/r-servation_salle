const express = require ("express");
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const mongoose=require("mongoose");
const User = require('./models/user');
const MeetingRoom = require('./models/meetingRoom');
const Reservation =  require("./models/reservation.js");
const bcrypt = require('bcrypt');
const reservationRoutes =require('./routes/reservationRoutes');
const meetingRoomRoutes=require('./routes/meetingRoomRoutes');
const authRoutes=require('./routes/authRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const reservationController = require("./controllers/reservationController");
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Mount the reservation routes at '/reservations' path
app.use('/reservation', reservationRoutes);
app.use('/meetingRoom',meetingRoomRoutes);
app.use('/calendar',calendarRoutes);
app.use('/',authRoutes);
// Register models with Mongoose
mongoose.model('Reservation', Reservation.schema);
mongoose.model('MeetingRoom', MeetingRoom.schema);
mongoose.model('User', User.schema);
mongoose.connect("mongodb+srv://user:walawala@cluster0.jfztsft.mongodb.net/reservationApp")
    .then(() =>{
        console.log("connected");})
    .catch(()=>{
        console.log("error");
    })
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de connexion à MongoDB :'));
db.once('open', () => {
    console.log('Connect à MongoDB !');
});

// GET request handler for displaying the reservation form
app.get('/formreservation', (req, res) => {
    res.render('formreservation'); // Assuming you're using a templating engine like EJS
});

// POST request handler for processing the form submission
app.post('/formreservation', (req, res) => {
    // Retrieve form data from request body
    const selectedMeetingRoom = req.body.selectedMeetingRoom;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    // Process the form data (e.g., save to database)
    // Replace the following with your logic to handle form submission
    console.log('Form submitted:');
    console.log('Selected meeting room:', selectedMeetingRoom);
    console.log('Start time:', startTime);
    console.log('End time:', endTime);

    // Send response back to the client
    res.send('Reservation submitted successfully!');
});


app.get('/', function (req, res) {
    res.render('app');
});


app.listen(4400,function () {
    console.log("server started on port 4100");

})