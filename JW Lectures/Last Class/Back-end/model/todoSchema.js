const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    todo: {
        type: 'String',
        require: true
    },
    created_at: {
        type: 'Date',
        default: Date.now()
    }
})

const TodoModel = mongoose.model('todo', todoSchema)

module.exports = TodoModel;