import { Schema, model } from 'mongoose'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../env.config.js'

const userSchema = new Schema({
    number: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        number: this.number
    }, JWT_SECRET, { expiresIn: "7d" })
    return token
};

const User = model('User', userSchema);

export default User;