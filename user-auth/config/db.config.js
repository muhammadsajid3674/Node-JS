const mongoose = require("mongoose")
const colors = require('colors');

const connectDB = async () => {
    const DB_URI = process.env.DB_URI;
    try {
        const conn = await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Database is connected :: ${conn.connection.host}`.yellow.underline);
    } catch (error) {
        console.log(`Error :: ${error}`.red);
    }
}

module.exports = connectDB;