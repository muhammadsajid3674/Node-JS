const express = require('express');
const todoController = require('../Controller/todoController');

const Router = express.Router();

Router.post('/api/todo', todoController.addTodo)

Router.get('/api/todo', todoController.getTodo)

Router.put('/api/todo', todoController.editTodo)

Router.delete('/api/todo/:id', todoController.deleteTodo)

module.exports = Router;