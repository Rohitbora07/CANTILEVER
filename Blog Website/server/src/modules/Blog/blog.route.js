import { createBlog } from "./blog.controller.js"
import upload from "../../middlewares/upload.js"
import { userAuth } from "../../middlewares/user.auth.js"
import express from "express"

const blogRouter = express.Router()

blogRouter.post("/create", userAuth, upload.single("coverImage"), createBlog)

export default blogRouter