import nodemailer from "nodemailer"
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

export const sendMail = async ( to, subject, html ) => {
    try {
        console.log("Sending mail to:", to);
        await transporter.sendMail({
            from: `"Blog" <${process.env.EMAIL}>`,
            to,
            subject,
            html
        })
    } catch (error) {
        console.log(error)
    }
}