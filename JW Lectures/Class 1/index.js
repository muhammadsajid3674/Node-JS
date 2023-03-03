const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/user');
const app = express();
const PORT = process.env.PORT || 5000;
const DBURI = 'mongodb+srv://admin:admin123@cluster0.s4xr5cb.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DBURI).then(res => console.log("Mongo-DB is connected")).catch(err => console.log('DB ERROR' + err))

app.use(express.json()) // use middleware to get data in server (body-parser)

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

app.put("/api/user", (request, response) => {
    console.log(request.body);
    response.send("UPDATE USER")
})

app.delete("/api/user", (request, response) => {
    console.log(request.body);
    response.send("DELETE USER")
})

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))