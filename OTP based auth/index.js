import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './src/config/db.config.js'
import { NODE_ENV, PORT } from './src/env.config.js'
import { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } from './src/error.js'
import authRouter from './src/routes/auth.route.js'
import dotenv from 'dotenv'

dotenv.config();

// init express
const app = express();

// middleware
app.use(express.json());
app.use(cors({
    credentials: true,
}));

// log in developement environment
if (NODE_ENV == "developement") {
    app.use(morgan("dev"))
};

// index route
app.get('/', (req, res) => {
    res.status(200).json({
        type: "success",
        message: "server is up and running",
        data: null
    });
});

// routes middlewares
app.use("/api/user", authRouter);

// page not found error handling middleware
app.use("*", (req, res, next) => {
    const error = {
        status: 404,
        message: API_ENDPOINT_NOT_FOUND_ERR
    };
    next(error);
});

//global error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    const status = err.status || 500;
    const message = err.message || SERVER_ERR;
    const data = err.data || null;
    res.status(status).json({
        type: "error",
        message,
        data
    });
});

connectDB();
app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`));