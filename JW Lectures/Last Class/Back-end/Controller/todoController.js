const TodoModel = require("../model/todoSchema");

const todoController = {
    addTodo: (req, res) => {
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
    },
    getTodo: (req, res) => {
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
    },
    editTodo: (req, res) => {
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
    },
    deleteTodo: (req, res) => {
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

    }
}

module.exports = todoController;