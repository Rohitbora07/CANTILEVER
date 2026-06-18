import express from "express"
import { sendVerifyOtp, userLogin, userLogout, userRegister } from "./user.controller.js"
import { userAuth } from "../../middlewares/user.auth.js"

const userRouter = express.Router()



userRouter.post("/login", userLogin)
userRouter.post("/register", userRegister)
userRouter.post("/logout", userLogout)
userRouter.post("/send", userAuth, sendVerifyOtp)

export default userRouter