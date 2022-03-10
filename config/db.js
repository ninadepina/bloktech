const mongoose = require('mongoose')

const connectDB = () => {
    try {
        mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: false,
            useUnifiedTopology: true
        });
        console.log('connection success')
    } catch (error) {
        throw error;
    }
}

module.exports = connectDB;