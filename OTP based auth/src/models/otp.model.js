import { Schema, model } from 'mongoose'

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: {
            expires: 300
        }
    }
}, { timestamps: true });

const Otp = model("Otp", otpSchema);

export default Otp