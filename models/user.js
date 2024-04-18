// user.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false }
});

// Define a pre-save hook to hash the password
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

if (mongoose.models.User) {
    // If it has been defined, use the existing model
    module.exports = mongoose.model('User');
} else {
    // If it hasn't been defined, define it and export it
    module.exports = mongoose.model('User', userSchema);
}