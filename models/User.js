const req = require('express/lib/request')
const mongoose = require('mongoose')
// init the user object
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
    type: String,
    required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
    namePet: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    breed: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User


// req.body -> naam
// const user = new User({req.body});
// user.save()