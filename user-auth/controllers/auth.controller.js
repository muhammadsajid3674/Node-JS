const User = require("../models/user.model");

exports.register = async (req, res) => {
    const { username, password } = req.body;
    if (password.length < 6) {
        res.status(400).json({ status: false, message: "Password lenght must be greater then 6" })
    }
    const userExists = await User.findOne({ username });
    if (userExists) {
        res.status(400).json({ status: false, message: "User exists" })
    }
    try {
        await User.create({
            username,
            password
        }).then(user => res.status(200).json({ status: true, message: "User is created successfully", user }))
    } catch (error) {
        res.status(400).json({ status: false, message: "Something went wrong", error: error.message })
    }
}