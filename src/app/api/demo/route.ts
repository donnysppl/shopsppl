import { NextRequest, NextResponse } from "next/server";
import Nodemailer from 'nodemailer';
import { mailTransport } from '@/helpers/common';
import { render } from '@react-email/render';
import {OrderCompleteEmail} from "@/helpers/Email/email";
import ProductOrder from "@/models/orderProduct";

export async function GET(req: NextRequest) {
    try {

        // const orderData = await ProductOrder.findOne({_id:'65be0c803dc50cd77bbbe6de'})
        const transporter = Nodemailer.createTransport(mailTransport);

        // const emailHtml = render(OrderCompleteEmail({ orderData:orderData }));

        const mailOption = {
            from: process.env.MAIL_SMTP_USER,
            to: ['donny@sppl.ind.in'],
            subject: "Order Completed",
            html: 'Hello'
        };
        const sendMail = await transporter.sendMail(mailOption);
        console.log("Message sent: %s", sendMail.messageId);

        return NextResponse.json({
            status: 200,
            message: 'mail ' , sendMail,
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}