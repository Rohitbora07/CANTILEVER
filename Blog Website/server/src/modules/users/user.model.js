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
    VerificationOtp: {
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
    profileImg: {
        type: String,
        required: false
    },
    numberOfBlogs: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    website: {
        type: String,
        default: ""
    },
    github: {
        type: String,
        default: ""
    },
    linkedin: {
        type: String,
        default: ""
    },
    twitter: {
        type: String,
        default: ""
    }
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;