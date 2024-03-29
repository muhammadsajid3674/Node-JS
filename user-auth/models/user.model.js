const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    role: {
        type: String,
        default: 'Basic',
        required: true
    },
}, {
    timestamps: true    
})

const User = model('user', userSchema);

module.exports = User;