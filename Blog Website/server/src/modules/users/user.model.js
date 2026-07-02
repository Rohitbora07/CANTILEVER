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
    backgroundImg: {
        type: String,
        required: false
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
    github: {
        type: String,
        default: ""
    },
    instagram: {
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
    },
    totalLikes: {
        type: Number,
        default: 0
    },
    totalViews: {
        type: Number,
        default: 0
    },
    totalBlogs: {
        type: Number,
        default: 0
    },
    totalFollowers: {
        type: Number,
        default: 0
    },
    totalFollowing: {
        type: Number,
        default: 0
    },
    followers: [{   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
},{timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;