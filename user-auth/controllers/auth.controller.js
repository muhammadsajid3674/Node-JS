const User = require("../models/user.model");
const { apiResponse } = require("../utils/res.util");

// @desc Register User
// @route POST /api/auth/register
// @access public
exports.register = async (req, res) => {
    const { username, password } = req.body;
    if (password.length < 6) {
        res.status(400).json(apiResponse("error", "Password lenght must be greater then 6"))
    }
    const userExists = await User.findOne({ username });
    if (userExists) {
        res.status(400).json(apiResponse("error", "User exists"))
    }
    try {
        await User.create({ username, password })
            .then(user => res.status(200).json(apiResponse("success", "User is created successfully", user)))
    } catch (error) {
        res.status(400).json(apiResponse("error", "Something went wrong", error.message))
    }
}

// @desc login User
// @route POST /api/auth/login
// @access public
exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json(apiResponse("error", "Credentials Required"))
    }
    try {
        await User.findOne({ username })
            .then(user => res.status(200).json(apiResponse("success", "User logged in", user)))
    } catch (error) {
        res.status(400).json(apiResponse("error", "Something went wrong", error.message))
    }
}

// @desc Update User
// @route PUT /api/auth/:id
// @access public
exports.update = async (req, res) => {
    const { role } = req.body;
    const { id } = req.params;
    if (!role || !id) {
        res.status(400).json(apiResponse("error", "Credentials Required"))
    }
    const user = await User.findById(id)
    if (user && user.role !== "Admin") {
        user.role = role;
        const updatedUser = await user.save();
        res.status(200).json(apiResponse("success", "User's Role Updated", updatedUser))
    } else {
        res.status(400).json(apiResponse("error", "User is already an Admin"))
    }
}

// @desc Register User
// @route DELETE /api/auth/:id
// @access private/admin
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json(apiResponse("error", "Id is Required"))
    }
    const user = await User.findById(id)
    console.log("user :: " + user);
    if (user) {
        const deletedUser = await User.deleteOne({ _id: id })
        res.status(200).json(apiResponse("success", "User deleted successfully", deletedUser))
    } else {
        res.status(400).json(apiResponse("error", "User not found"))
    }
}