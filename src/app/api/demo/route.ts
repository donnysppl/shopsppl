import { NextRequest, NextResponse } from "next/server";
import Nodemailer from 'nodemailer';
import { mailTransport } from '@/helpers/common';
import { render } from '@react-email/render';
import {OTPEmail} from "@/helpers/Email/email";

export async function GET(req: NextRequest) {
    try {

        const transporter = Nodemailer.createTransport(mailTransport);

        const emailHtml = render(OTPEmail({ url: "/img/logo.png", otp:"568923" }));

        const mailOption = {
            from: process.env.MAIL_SMTP_USER,
            to: ['donny@sppl.ind.in','donnybangaji@gmail.com'],
            subject: "Verify Your Email",
            html: emailHtml
        };

        const sendMail = await transporter.sendMail(mailOption);
        console.log("Message sent: %s", sendMail.messageId);
        return NextResponse.json({
            status: 200,
            message: `Message sent: %s ${sendMail.messageId}`,
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}