const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const TodoModel = require('./model/todoSchema');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const DBURI = 'mongodb+srv://admin:admin123@cluster0.s4xr5cb.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DBURI).then(res => console.log("Mongo-DB is connected")).catch(err => console.log('DB ERROR' + err))

const PORT = process.env.PORT || 5000;

app.post('/api/todo', (req, res) => {
    const { todo } = req.body;
    if (!todo) {
        res.json({
            message: 'Required field is missing',
            status: false,
        });
        return;
    }
    const objToSend = {
        todo: todo,
    }
    TodoModel.create(objToSend)
        .then(data => {
            res.json({
                message: 'Todo added',
                status: true,
                todo: data
            })
        })
        .catch(err => {
            res.json({
                message: `Internal Error: ${err}`,
                status: true,
            })
        })
})

app.get('/api/todo', (req, res) => {
    TodoModel.find({})
        .then(data => {
            res.json({
                message: 'Todo Get',
                status: true,
                todo: data
            })
        })
        .catch(err => {
            res.json({
                message: `Internal Error: ${err}`,
                status: true,
            })
        })
})

app.put('/api/todo', (req, res) => {
    const { todo, id } = req.body;
    const objToSend = {
        todo: todo
    }
    TodoModel.findByIdAndUpdate(id, objToSend)
        .then(data => {
            res.json({
                message: 'Todo Uppdated',
                status: true,
                todo: data
            })
        })
        .catch(err => {
            res.json({
                message: `Internal Error: ${err}`,
                status: true,
            })
        })
})

app.delete('/api/todo/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(data => {
            res.json({
                message: 'Todo Deleted',
                status: true,
                todo: data
            })
        })
        .catch(err => {
            res.json({
                message: `Internal Error: ${err}`,
                status: true,
            })
        })

})

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))