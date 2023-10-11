import CustomerOTPVerification from "@/models/customerOTPVerify";
import bcryptjs from 'bcryptjs';
import Nodemailer from 'nodemailer';
import { mailTransport } from '@/helpers/common';

export const sendOtp = async (email: string, id?:string) => {

    const salt = await bcryptjs.genSalt(10);
    const transporter = Nodemailer.createTransport(mailTransport);

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    // mail option
    const mailOption = {
        from: process.env.MAIL_SMTP_USER,
        to: email,
        subject: "Verify Your Email",
        html: `<p>${otp}</p>`
    };

    const hashedOTP = await bcryptjs.hash(otp, salt);
    const checkOtp = await CustomerOTPVerification.findOne({customerID:id}) as any;
    console.log((!checkOtp))
    if(!checkOtp){
        const newOTPVerification = await new CustomerOTPVerification({
            customerID: id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiredAt: Date.now() + 300000,
        })
        await newOTPVerification.save();
    }
    else{
        await CustomerOTPVerification.findByIdAndUpdate(checkOtp._id as string,{
            customerID: id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiredAt: Date.now() + 300000,
        })
    }
    
    const sendMail = await transporter.sendMail(mailOption);
    console.log("Message sent: %s", sendMail.messageId);
    return {sendMail}
}