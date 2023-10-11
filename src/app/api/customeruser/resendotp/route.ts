import { NextRequest, NextResponse } from "next/server";
import Nodemailer from 'nodemailer';
import CustomerOTPVerification from '@/models/customerOTPVerify';
import bcryptjs from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        const { customerID, email } = await req.json();
        if (!customerID || !email) {
            return NextResponse.json({
                status: 400,
                message: 'Please Fill the data properly',
            }, { status: 400 })
        }
        else {
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
                customerID: customerID,
                otp: hashedOTP,
                createdAt: Date.now(),
                expiredAt: Date.now() + 3600000,
            })

            await newOTPVerification.save();
            const sendMail = await transporter.sendMail(mailOption);

            console.log("Message sent: %s", sendMail.messageId);

            return NextResponse.json({
                status: 200,
                message: 'Resend Otp on mail',
                result: {
                    customer: customerID,
                    email,
                }, sendMail
            }, { status: 200 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}