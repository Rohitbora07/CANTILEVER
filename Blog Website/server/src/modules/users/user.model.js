import e from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationOtp: {
        type: String,
    },
    emailOtpExpiry: {
        type: Date,
    },
    passResetOtp: {
        type: String,
    },
    passResetOtpExpiry: {
        type: Date,
    },
    profileImg:{
        type:String,
        required: false
    },
    numberOfBlogs: {
        type: Number,
        default: 0
    }
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;