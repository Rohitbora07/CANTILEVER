import User from "./user.model";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const userLogin = async (req,res) => {
    const { email, password } = req.body
    if( !email || !password ){
        return res.status(400).json({ success: false, message: "Missing Required Details !!" })
    }
    try{
        const user = User.findOne({ email })
        if( !user ){
            return res.status(400).json({ success: false, message: "User not found" })
        }
        
        const isMatched = await bcrypt.compare( password, user.password )
        if( !isMatched ){
            return res.status(400).json({ success: false, message: "Incorrect Password" })
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn: '7d'})

        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'?
            'none':'strict',
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({success:true, token, message:"Login successful"})
    }catch(err){
        return res.status(500).json({
            success: false,
            message: `User login error: ${err}`
        })
    }
}