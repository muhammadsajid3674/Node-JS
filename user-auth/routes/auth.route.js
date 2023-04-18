const express = require('express');
const { register, login, update, deleteUser } = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/:id").put(update);
authRouter.route("/:id").delete(deleteUser);

module.exports = authRouter;