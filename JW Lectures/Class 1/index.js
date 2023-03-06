const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userModel = require('./models/user');
const app = express();

const PORT = process.env.PORT || 5000;
const DBURI = 'mongodb+srv://admin:admin123@cluster0.s4xr5cb.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DBURI).then(res => console.log("Mongo-DB is connected")).catch(err => console.log('DB ERROR' + err))

app.use(express.json()) // use middleware to get data in server (body-parser)

// User Get
app.get("/api/user", (request, response) => {
    // const { userId } = request.params; // Params
    const { userId } = request.query; // Query Parameter

    // userModel.findOne({ _id: userId })
    // userModel.find({})
    userModel.findById(userId)
        .then(data => {
            response.json({
                message: 'USER GET SUCESSFULLY',
                data: data,
                status: true
            })
        }).catch(error => {
            response.json({
                message: `Internal Error: ${error}`,
                status: false
            })
        })
})

// User Create
app.post("/api/user", (request, response) => {
    const { firstName, lastName, email, password } = request.body;
    if (!firstName || !lastName || !email || !password) {
        response.json({
            message: 'Requires fields are missing',
            status: false
        })
        return;
    }
    const objToSend = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
    }
    userModel.create(objToSend)
        .then((data) => {
            response.json({
                message: 'USER IS CREATED SUCESSFULLY',
                data: data,
                status: true
            })
        }).catch((error) => {
            response.json({
                message: `Internal Error: ${error}`,
                status: false
            })
        })
})

// User Update
app.put("/api/user", (request, response) => {
    const { userId } = request.params;
    const { firstName, lastName, email, password } = request.body;
    const objToSend = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
    }

    userModel.updateOne(userId, objToSend)
        .then((data) => {
            response.json({
                message: 'USER IS UPDATED SUCESSFULLY',
                data: data,
                status: true
            })
        }).catch((error) => {
            response.json({
                message: `Internal Error: ${error}`,
                status: false
            })
        })
})

// User Delete
app.delete("/api/user", (request, response) => {
    const { userId } = request.body;
    userModel.deleteOne(userId)
        .then((data) => {
            response.json({
                message: 'USER IS DELETED SUCESSFULLY',
                data: data,
                status: true
            })
        }).catch((error) => {
            response.json({
                message: `Internal Error: ${error}`,
                status: false
            })
        })
})

// User Signup
app.post("/api/signup", (request, response) => {
    const { firstName, lastName, phone, email, dob, password } = request.body;
    const hashPassword = bcrypt.hashSync(password, 10)
    const objToSend = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hashPassword,
        dob: dob,
        phone: phone
    }
    if (!firstName || !lastName || !phone || !email || !dob || !password) {
        response.json({
            message: "Required fields are missing",
            status: false
        });
        return;
    }
    userModel.findOne({ email: email })
        .then((data) => {
            if (data) {
                response.json({
                    message: 'EMAIL ALREADY EXISTS',
                    data: data,
                    status: false
                })
            } else {
                userModel.create(objToSend)
                    .then((data) => {
                        response.json({
                            message: 'USER SIGNUP SUCESSFULLY',
                            data: data,
                            status: true
                        })
                    }).catch((error) => {
                        response.json({
                            message: `Internal Error: ${error}`,
                            status: false
                        })
                    })
            }
        }).catch((error) => {
            response.json({
                message: `Internal Error: ${error}`,
                status: false
            })
        })
})

// User Login
app.post("/api/login", (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        response.json({
            message: 'Require fields are missing',
            status: false
        })
    }
    userModel.findOne({ email: email })
        .then((data) => {
            const comparePassword = bcrypt.compareSync(password, data.password)
            if (comparePassword) {
                response.json({
                    message: 'USER LOGIN SUCESSFULLY',
                    data: data,
                    status: true
                })
            } else {
                response.json({
                    message: 'CREDENTIAL ERROR',
                    status: false
                })
            }
        }).catch((error) => {
            response.json({
                message: "CREDENTIAL ERROR",
                status: false
            })
        })
})

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))