import User from "./user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { sendMail } from "../../config/nodemailer.js";
import { welcomeEmailTemplate } from "../../templates/welcomeEmail.js";
import { verificationOtpTemplate } from "../../templates/verificationOtpTemplate.js";

export const userLogin = async (req,res) => {
    const { email, password } = req.body
    if( !email || !password ){
        return res.status(400).json({ success: false, message: "Missing Required Details !!" })
    }
    try{
        const user = await User.findOne({ email })
        if( !user ){
            return res.status(401).json({ success: false, message: "User not found" })
        }
        
        const isMatched = await bcrypt.compare( password, user.password )
        if( !isMatched ){
            return res.status(401).json({ success: false, message: "Incorrect Password" })
        }

        const token = jwt.sign({
            id:user._id,
            email: user.email,
            name: user.name,
            role: user.role
        }, process.env.JWT_SECRET,{expiresIn: '7d'})

        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({success:true, message:"Login successful"})
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const userRegister = async ( req,res ) => {
    const { name, email, password } = req.body;
    if( !name || !email || !password ){
        return res.status(400).json({
            success:false,
            message: "Required fields are missing"
        })
    }
    try{
        const existingUser = await User.findOne({ email: email })
        if( existingUser ){
            return res.status(400).json({
                success: false,
                message: "A user already exists with this email"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id:user._id,
            email: user.email,
            name: user.name,
            role: user.role
        }, process.env.JWT_SECRET,{expiresIn: '7d'})

        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 7*24*60*60*1000
        })

        const html = welcomeEmailTemplate(user.name, `http://localhost:5173/verify/${user._id}`)
        await sendMail(
            email,
            "Welcome to our website",
            html
        )

        return res.status(200).json({
            success: true,
            message: "User created successfully"
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const userLogout = async (req, res) => {
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
        })

        return res.status(200).json({
            success: true,
            message: "User logged out succesfully"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const sendVerifyOtp = async (req, res) => {
    try{
        const userId = req.userId
        const user = await User.findById(userId)

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found !!"
            })
        }

        if(user.isEmailVerified) return res.status(200).json({
            success: true,
            message: "User already verified"
        })

        const otp = String(Math.floor(100000+Math.random()*900000))

        user.emailVerificationOtp = otp;
        user.emailOtpExpiry = Date.now()+10*60*1000

        await user.save()

        const html = verificationOtpTemplate(user.name, otp);
        await sendMail(
            user.email,
            "Email Verification Otp",
            html
        )

        return res.status(200).json({
            success: true,
            message: "Otp sent to your email"
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
