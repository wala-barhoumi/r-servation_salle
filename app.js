const express = require ("express");
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const mongoose=require("mongoose");
const User = require("./models/user.js");
const MeetingRoom = require('./models/meetingRoom');
const Reservation =  require("./models/reservation.js");
const bcrypt = require('bcrypt');
const reservationRoutes =require('./routes/reservationRoutes');
const meetingRoomRoutes=require('./routes/meetingRoomRoutes');
const reservationController = require("./controllers/reservationController");
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Mount the reservation routes at '/reservations' path
app.use('/reservation', reservationRoutes);
app.use('/meetingRoom',meetingRoomRoutes);


app.post('/reservation', reservationController.createReservation);
app.get('/reservation', reservationController.getAllReservations);
app.put('/reservation/:id', reservationController.updateReservation);
app.delete('/reservation/:id', reservationController.deleteReservation);

// Register models with Mongoose
mongoose.model('Reservation', Reservation.schema);
mongoose.model('MeetingRoom', MeetingRoom.schema);

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
app.get('/login',function (req,res){
    res.render('login');

});
app.post("/login", async (req, res) => {
    const userData = {
        name: req.body.username,
        password: req.body.password
    };

    try {
        const newUser = await User.insertOne(userData);
        console.log(newUser);
        res.status(200).send("User created successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating user.");
    }
});


app.get('/signup',function (req,res){
    res.render('signup');
});
// Register User
app.post("/signup", async (req, res) => {
    const { id, username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ name: username });
        if (existingUser) {
            return res.status(400).send("User already exists.");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object with hashed password
        const newUser = new User({
            id,
            name: username,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Respond with success message
        res.status(201).send("User created successfully.");
    } catch (error) {
        // Handle errors
        console.error("Error:", error);
        res.status(500).send("Server Error");
    }
});

/*app.get('/meetingRoom', async (req, res) => {
    try {
        // Fetch meeting rooms from the database using your model
        const meetingRoom = await MeetingRoom.find();

        // Render the HTML template and pass the meetingRooms variable
        res.render('meetingRoom', { meetingRoom });
    } catch (error) {
        console.error('Error fetching meeting rooms:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.post("/meetingRoom", async (req, res) => {
    try {
        // Extract data from the request body
        const { name, capacity, amenities } = req.body;

        // Create a new meeting room instance
        const newMeetingRoom = new MeetingRoom({
            name,
            capacity,
            amenities: amenities.split(',').map(item => item.trim()) // Convert amenities string to array
        });

        // Save the new meeting room to the database
        await newMeetingRoom.save();

        // Respond with a success message
        res.status(201).json({ message: 'Meeting room created successfully', meetingRoom: newMeetingRoom });
    } catch (error) {
        console.error('Error creating meeting room:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Assuming you have an array of reservations stored in a variable named 'reservations'
app.get('/reservation', async (req, res) => {
    try {
        // Fetch reservations from the database
        const reservation = await Reservation.find().populate('user meetingRoom');

        // Fetch meeting rooms from the database
        const meetingRoom = await MeetingRoom.find();

        // Render the reservation page and pass the reservations and meetingRooms data to the template
        res.render('reservation', { reservation, meetingRoom });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST method to create a reservation
app.post('/reservation', async (req, res) => {
    try {
        const { user, selectedMeetingRoom, startTime, endTime } = req.body;

        // Check if the meeting room is available for the specified time
        const existingReservation = await Reservation.findOne({
            meetingRoom: selectedMeetingRoom,
            $or: [
                { $and: [{ startTime: { $lt: endTime } }, { endTime: { $gt: startTime } }] },
                { startTime: { $gte: startTime, $lt: endTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ]
        });

        if (existingReservation) {
            return res.status(400).json({ error: 'The meeting room is already booked for the specified time.' });
        }

        // Create new reservation
        const reservation = new Reservation({
            user: user,
            meetingRoom: selectedMeetingRoom,
            startTime: startTime,
            endTime: endTime
        });

        await reservation.save();

        res.status(201).json({ message: 'Reservation created successfully', reservation: reservation });
    } catch (err) {
        console.error('Error creating reservation:', err);
        res.status(500).json({ error: 'An error occurred while creating the reservation.' });
    }
});*/
app.listen(4100,function () {
    console.log("server started on port 4100");

})
