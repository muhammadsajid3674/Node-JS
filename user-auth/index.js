const express = require('express');
const connectDB = require('./config/db.config');
const authRouter = require('./routes/auth.route');
const morgan = require('morgan');
const colors = require('colors');
require('dotenv').config();

const app = express();

// middleware
app.use(express.json());

connectDB();

// morgan developement environment
if (process.env.NODE_ENV == "developement") {
    app.use(morgan("dev"))
}

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Server is running on PORT: http://localhost:${PORT}`.cyan));

// handling error
process.on("unhandledRejection", err => {
    console.log(`An error occur:: ${err.message}`.red);
    server.close(() => process.exit(1));
})