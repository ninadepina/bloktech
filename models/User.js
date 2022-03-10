const req = require('express/lib/request')
const mongoose = require('mongoose')
// init the user object
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
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
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User


// req.body -> naam
// const user = new User({req.body});
// user.save()