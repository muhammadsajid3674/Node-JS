import express from 'express'
import { signUp, verifyOtp } from '../controller/user.controller.js'

const authRouter = express.Router();

authRouter.route('/register').post(signUp);

authRouter.route('/verify').post(verifyOtp);

export default authRouter;