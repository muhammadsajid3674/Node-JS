import otpGenerator from 'otp-generator'
import bcrypt from 'bcrypt'
import Otp from '../models/otp.model.js'
import User from '../models/user.model.js'
import sendMessage from '../utils/send.utils.js'
import { EMAIL_ALREADY_EXISTS_ERR, OTP_EXPIRED } from '../error.js'

export const signUp = async (req, res, next) => {
    const { number } = req.body;
    const userExits = await User.findOne({ number });
    console.log("User :: " + userExits);
    if (userExits) return next({ status: 400, message: EMAIL_ALREADY_EXISTS_ERR })
    const OTP = otpGenerator.generate(6, {
        digits: true, alphabets: true, upperCaseAlphabets: false, specialChars: false
    })
    console.log(OTP);
    const otpModel = new Otp({ number: number, otp: OTP })
    const salt = await bcrypt.genSalt(10);
    otpModel.otp = await bcrypt.hash(otpModel.otp, salt)
    const result = await otpModel.save();
    return res.status(200).json({ type: "success", message: "OTP send successfully", data: result })
};

export const verifyOtp = async (req, res, next) => {
    const { number, otp } = req.body;
    const otpHolder = await Otp.findOne({ number });
    if (!otpHolder) return next({ status: 400, message: OTP_EXPIRED })
    const validUser = await bcrypt.compare(otp, otpHolder.otp)
    if (validUser) {
        const user = await User.create({ number });
        const token = user.generateJWT();
        const result = await user.save();
        await Otp.deleteMany({
            number: otpHolder.number
        })
        await sendMessage({ token: token, number: result.number })
        return res.status(200).json({ type: "success", message: "User Registeration Successfull!", data: result, token: token })
    } else {
        next({ status: 400, message: 'Your OTP is wrong' })
    }
};