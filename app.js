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
app.get('/', function (req, res) {
    res.render('app');
});
app.listen(4100,function () {
    console.log("server started on port 4100");
});