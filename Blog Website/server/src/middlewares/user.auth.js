import jwt from "jsonwebtoken"
import User from "../modules/users/user.model.js"

export const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
        
        if (!token) {
            return res.json({ success: false, message: " Unauthorized User" })
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(tokenDecode.id)
        if (!user) {
            return res.json({ success: false, message: " Unauthorized User" })
        }
        req.user = user;

        if(!tokenDecode?.id) {
            return res.json({ success: false, message: " Unauthorized User" })
        }
        req.userId = tokenDecode.id;

        next()

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}