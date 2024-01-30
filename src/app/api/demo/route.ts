import { NextRequest, NextResponse } from "next/server";
import Nodemailer from 'nodemailer';
import { mailTransport } from '@/helpers/common';

export async function GET(req: NextRequest) {
    try {

        const transporter = Nodemailer.createTransport(mailTransport);
        const mailOption = {
            from: process.env.MAIL_SMTP_USER,
            to: 'donny@sppl.ind.in',
            subject: "Order Completed",
            html: 'Hello'
        };
        const sendMail = await transporter.sendMail(mailOption);
        console.log("Message sent: %s", sendMail.messageId);

        return NextResponse.json({
            status: 200,
            message: 'mail ' + sendMail,
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}