var mongoose = require('mongoose');
// import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropUps: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
// export default userModel;