const express = require ("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://user:walawala@cluster0.jfztsft.mongodb.net/reservation?retryWrites=true&w=majority&appName=Cluster0")
    .then(() =>{
    console.log("connected");})
    .catch(()=>{
        console.log("error");
    })
const User=require('./models/user')
app.listen(3000,function () {
    console.log("server started on port 3000");

})
app.get('/', function (req, res) {
    res.send('bonjour')
})
app.post('/user',async (req,res)=>{
try {
  const user=  await User.create(req.body);
  res.status(200).json(user);

}catch (error){
    res.status(500).json({message:error.message})
}

});