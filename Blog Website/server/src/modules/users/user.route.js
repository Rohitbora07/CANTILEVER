import express from "express"
import { getCurrentUser, passReset, resetOtp, sendVerifyOtp, userLogin, userLogout, userRegister, verifyEmail, updateUserProfile, getUserProfile } from "./user.controller.js"
import { userAuth } from "../../middlewares/user.auth.js"
import upload from "../../middlewares/upload.js"
import { getUserBlogs } from "../Blog/blog.controller.js"

const userRouter = express.Router()



userRouter.post("/login", userLogin)
userRouter.post("/register", userRegister)
userRouter.post("/logout", userLogout)
userRouter.post("/send-verification-otp", userAuth, sendVerifyOtp)
userRouter.post("/verify", userAuth, verifyEmail)
userRouter.post("/send-reset-otp", userAuth, resetOtp)
userRouter.post("/reset-password", userAuth, passReset)
userRouter.get("/me", userAuth, getCurrentUser)
userRouter.put("/update-profile", userAuth, upload.fields([{ name: "profileImg", maxCount: 1 }, { name: "backgroundImg", maxCount: 1 }]), updateUserProfile)
userRouter.get("/:userId/blogs", userAuth, getUserBlogs)
userRouter.get("/profile/:userId", userAuth, getUserProfile)

export default userRouter