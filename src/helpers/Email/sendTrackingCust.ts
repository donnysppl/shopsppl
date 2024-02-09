"use server";
import Nodemailer from 'nodemailer';
import { mailTransport } from '@/helpers/common';
import { render } from '@react-email/render';
import { EkartDetailsEmail } from './email';


export default async function sendTrackingCust(orderListData:any) {
    const transporter = Nodemailer.createTransport(mailTransport);
    const emailHtml = render(EkartDetailsEmail({ orderData:orderListData }));

    const mailOption = {
        from: process.env.MAIL_SMTP_USER,
        to: orderListData.email,
        // to: 'kunal@sppl.ind.in',
        subject: "Order Tracking Details | Shopsppl",
        html: emailHtml
    };
    const sendMail = await transporter.sendMail(mailOption);
    console.log("Message sent: %s", sendMail.messageId);
}
