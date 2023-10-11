import Nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import CustomerOTPVerification from '@/models/customerOTPVerify';

interface sentOTPparms {
    _id: string;
    email: string;
}

export async function sendOTPVerification({ _id, email }: sentOTPparms) {
    const transporter = Nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'sales@sppl.ind.in',
            pass: 'SPPL@2901###'
        }
    });
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    // mail option
    const mailOption = {
        from: 'sales@sppl.ind.in',
        to: email,
        subject: "Verify Your Email",
        html: `<p>${otp}</p>`
    };

    const salt = await bcryptjs.genSalt(10);
    const hashedOTP = await bcryptjs.hash(otp, salt);

    const newOTPVerification = await new CustomerOTPVerification({
        customerID: _id,
        otp: hashedOTP,
        createdAt: Date.now(),
        expiredAt: Date.now() + 3600000,
    })

    await newOTPVerification.save();
    const sendMail = await transporter.sendMail(mailOption);

    console.log("Message sent: %s", sendMail.messageId);
    return sendMail;
}