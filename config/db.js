const mongoose = require("mongoose");

const connectDB = () => {
    try {
        mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connection success");
    } catch (err) {
        throw err;
    }
}

module.exports = connectDB;