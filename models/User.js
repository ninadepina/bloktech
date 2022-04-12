const mongoose = require("mongoose")

// init the user object
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    confirm_password: String,
    name_pet: String,
    birthday: Date,
    breed: String
})

const User = mongoose.model("User", userSchema)
module.exports = User