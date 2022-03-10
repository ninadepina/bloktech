const req = require('express/lib/request')
const mongoose = require('mongoose')
// init the user object
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    confirm_password: String,
    namePet: String,
    birthday: Date,
    breed: String
})

const User = mongoose.model('User', userSchema)
module.exports = User