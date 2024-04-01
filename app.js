const express = require ("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose=require("mongoose")
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://user:walawala@cluster0.jfztsft.mongodb.net/reservationApp?retryWrites=true&w=majority&appName=Cluster0")
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


app.listen(4000,function () {
    console.log("server started on port 4000");

})
app.get('/', function (req, res) {
    res.render('app');
});
app.get('/login',function (req,res){
    res.render('login');
});
app.get('/signup',function (req,res){
    res.render('signup');
});
app.get('/room/',function (req,res){
    res.render('meetingRoom');
});
app.get('/reservation/',function (req,res){
    res.render('reservation');
});
