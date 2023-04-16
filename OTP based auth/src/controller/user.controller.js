import otpGenerator from 'otp-generator'
import bcrypt from 'bcrypt'
import Otp from '../models/otp.model.js'
import User from '../models/user.model.js'
import { EMAIL_ALREADY_EXISTS_ERR, OTP_EXPIRED } from '../error.js'
import { sendEmail } from '../utils/mailer.utils.js'

export const signUp = async (req, res, next) => {
    const { email } = req.body;
    const userExits = await User.findOne({ email });
    if (userExits) return next({ status: 400, message: EMAIL_ALREADY_EXISTS_ERR })
    const OTP = otpGenerator.generate(6, {
        digits: true, alphabets: true, upperCaseAlphabets: false, specialChars: false
    })
    console.log(OTP);
    const otpModel = new Otp({ email: email, otp: OTP })
    const salt = await bcrypt.genSalt(10);
    otpModel.otp = await bcrypt.hash(otpModel.otp, salt)
    const result = await otpModel.save();
    await sendEmail({ email: otpModel.email, otp: OTP })
    return res.status(200).json({ type: "success", message: "OTP send successfully", data: result })
};

export const verifyOtp = async (req, res, next) => {
    const { email, otp } = req.body;
    const otpHolder = await Otp.findOne({ email });
    if (!otpHolder) return next({ status: 400, message: OTP_EXPIRED })
    const validUser = await bcrypt.compare(otp, otpHolder.otp)
    console.log("validUser :: " + validUser);
    if (validUser) {
        const user = await User.create({ email });
        const token = user.generateJWT();
        const result = await user.save();
        await Otp.deleteMany({
            email: otpHolder.email
        })
        return res.status(200).json({ type: "success", message: "User Registeration Successfull!", data: result, token: token })
    } else {
        next({ status: 400, message: 'Your OTP is wrong' })
    }
};