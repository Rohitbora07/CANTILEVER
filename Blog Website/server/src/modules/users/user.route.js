import express from "express"
import { userLogin } from "./user.controller.js"

const userRouter = express.Router()

userRouter.post("/login", userLogin)

export default userRouter