import express from "express"
import { passReset, resetOtp, sendVerifyOtp, userLogin, userLogout, userRegister, verifyEmail } from "./user.controller.js"
import { userAuth } from "../../middlewares/user.auth.js"

const userRouter = express.Router()



userRouter.post("/login", userLogin)
userRouter.post("/register", userRegister)
userRouter.post("/logout", userLogout)
userRouter.post("/send-verification-otp", userAuth, sendVerifyOtp)
userRouter.post("/verify", userAuth, verifyEmail)
userRouter.post("/send-reset-otp", userAuth, resetOtp)
userRouter.post("/reset-password", userAuth, passReset)

export default userRouter