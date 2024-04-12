const express = require ("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose=require("mongoose");
const User = require("./models/user.js");
const MeetingRoom = require('./models/meetingRoom');
const Reservation =  require("./models/reservation.js");
const bcrypt = require('bcrypt');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://ons:123ons@cluster0.kkewg2d.mongodb.net/booking")
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
app.post("/login",async (req , res)=>{
    const data = {
        
        name: req.body.username,
        
        password: req.body.password
       
       
    }
    const userdata= await User.insertMany(data);
        console.log (userdata); 
})

app.get('/signup',function (req,res){
    res.render('signup');
});
// Register User
app.post("/signup", async (req, res) => {
    const data = {
    id: req.body.id,
    name: req.body.username,
    email: req.body.password,
    password: req.body.password
   
}
     const existingUser = await User.findOne({name:data.name});
     if (existingUser){
            res.send("user already exist ")
     } else { 
        //hash password
        const saltRounds = 10 ; 
        const hashedPassword = await  bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword; 
        const userdata= await User.insertMany(data);
        console.log (userdata);
    }
   
});

app.get('/meetingRoom', async (req, res) => {
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
/*router.post("/meetingRoom", async (req, res) => {
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
*/


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


app.listen(4100,function () {
    console.log("server started on port 4100");

})
