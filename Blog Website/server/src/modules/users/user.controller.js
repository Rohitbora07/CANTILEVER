import User from "./user.model.js";
import Blog from "../Blog/blog.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { sendMail } from "../../config/nodemailer.js";
import { welcomeEmailTemplate } from "../../templates/welcomeEmail.js";
import { verificationOtpTemplate } from "../../templates/verificationOtpTemplate.js";
import { passwordResetOtpTemplate } from "../../templates/resetPasswordOtpTemplate.js";
import cloudinary from "../../config/cloudinary.js";

export const userLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Missing Required Details !!" })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" })
        }

        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(401).json({ success: false, message: "Incorrect Password" })
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Required fields are missing"
        })
    }
    try {
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "A user already exists with this email"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const html = welcomeEmailTemplate(user.name, user.email)
        await sendMail(
            email,
            "Welcome To The Daily Binge",
            html
        )

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const userLogout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
        })

        return res.status(200).json({
            success: true,
            message: "User logged out succesfully"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found !!"
            })
        }

        if (user.isEmailVerified) return res.status(200).json({
            success: true,
            message: "User already verified"
        })

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.VerificationOtp = otp;
        user.emailOtpExpiry = Date.now() + 10 * 60 * 1000

        await user.save()

        const html = verificationOtpTemplate(user.name, otp);
        await sendMail(
            user.email,
            "Email Verification Otp",
            html
        )

        return res.status(200).json({
            success: true,
            message: "Email verification Otp has been sent to your email"
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const verifyEmail = async (req, res) => {

    const { otp } = req.body
    const userId = req.userId

    if (!otp || !userId) {
        return res.status(400).json({ success: false, message: "Missing details" })
    }

    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        if (user.VerificationOtp === '' || user.VerificationOtp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid Otp" })
        }

        if (user.emailOtpExpiry < Date.now()) {
            return res.status(400).json({ success: false, message: "Otp has expired" })
        }

        user.isEmailVerified = true;
        user.VerificationOtp = "";
        user.emailOtpExpiry = 0;
        user.save()

        return res.status(200).json({ success: true, message: "Email verified successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const resetOtp = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found !!"
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.passResetOtp = otp
        user.passResetOtpExpiry = Date.now() + 10 * 60 * 1000

        await user.save()

        const html = passwordResetOtpTemplate(user.name, user.email, otp);
        await sendMail(
            user.email,
            "Password Reset Otp",
            html
        )

        return res.status(200).json({
            success: true,
            message: "Password Reset Otp has been sent to your email"
        })

    } catch (error) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const passReset = async (req, res) => {
    const { otp, newPassword } = req.body
    const userId = req.userId

    if (!otp || !userId || !newPassword) {
        return res.status(400).json({ success: false, message: "Missing details" })
    }
    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        if (user.passResetOtp === '' || user.passResetOtp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid Otp" })
        }
        if (user.passResetOtpExpiry < Date.now()) {
            return res.status(400).json({ success: false, message: "Otp has expired" })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword
        user.passResetOtp = ""
        user.passResetOtpExpiry = 0

        await user.save()

        return res.status(200).json({ success: true, message: "Password reset successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getCurrentUser = async (req, res) => {
    const userId = req.userId
    if (!userId) {
        return res.status(400).json({ success: false, message: "Missing userId" })
    }
    try {
        const user = await User.findById(userId).select("-password -VerificationOtp -emailOtpExpiry -passResetOtp -passResetOtpExpiry")
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        return res.status(200).json({ success: true, user })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const updateUserProfile = async (req, res) => {
    const { name, bio, github, instagram, linkedin, twitter, profileImg, location, backgroundImg } = req.body
    const userId = req.userId
    if (!userId) {
        return res.status(400).json({ success: false, message: "Missing userId" })
    }
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        let uploadImg;
        if (req.files && req.files.profileImg && req.files.profileImg[0]) {
            uploadImg = await cloudinary.uploader.upload(req.files.profileImg[0].path,
                {
                    resource_type: 'image',
                    folder: "user"
                })
        }
        let uploadBackgroundImg;

        if (req.files && req.files.backgroundImg && req.files.backgroundImg[0]) {
            uploadBackgroundImg = await cloudinary.uploader.upload(req.files.backgroundImg[0].path,
                {
                    resource_type: 'image',
                    folder: "user"
                })
        }

        user.name = name || user.name
        user.bio = bio || user.bio
        user.github = github || user.github
        user.instagram = instagram || user.instagram
        user.linkedin = linkedin || user.linkedin
        user.twitter = twitter || user.twitter
        user.profileImg = profileImg || user.profileImg
        user.location = location || user.location
        // user.backgroundImg = backgroundImg || user.backgroundImg
        if(uploadImg) user.profileImg = uploadImg.secure_url
        if(uploadBackgroundImg) user.backgroundImg = uploadBackgroundImg.secure_url

        await user.save()
        return res.status(200).json({ success: true, message: "Profile updated successfully", user })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId)
            .select("-password -VerificationOtp -emailOtpExpiry -passResetOtp -passResetOtpExpiry");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const blogs = await Blog.find({
            author: userId,
            status: "published",
            visibility: "public"
        })
        .select("title slug coverImage views likes commentsCount createdAt category tags")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            user,
            blogs
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};