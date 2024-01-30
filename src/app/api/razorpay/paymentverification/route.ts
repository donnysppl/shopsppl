// import { instance } from "@/helpers/RazorInt";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto"
import ProductOrder from "@/models/orderProduct";
import Nodemailer from 'nodemailer';
import { mailTransport } from '@/helpers/common';
import { render } from '@react-email/render';
import {OrderCompleteEmail} from "@/helpers/Email/email";


export async function POST(req: NextRequest) {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, userid, email } = await req.json();
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY!)
        .update(body.toString())
        .digest('hex');

    const isValid = expectedSignature === razorpay_signature;
    
    await ProductOrder.findByIdAndUpdate(userid, {
        paymentid: razorpay_payment_id, orderid: razorpay_order_id, status: 'payment completed', paymentdate: new Date()
    })

    const orderData = await ProductOrder.findOne({_id:userid})
    const transporter = Nodemailer.createTransport(mailTransport);
    const emailHtml = render(OrderCompleteEmail({ orderData:orderData }));
    // mail option
    const mailOption = {
        from: process.env.MAIL_SMTP_USER,
        to: email,
        subject: "Order Completed",
        html: emailHtml
    };
    const sendMail = await transporter.sendMail(mailOption);
    console.log("Message sent: %s", sendMail.messageId);

    if (!isValid) {
        return NextResponse.json({
            status: 400,
            message: 'Payment not varified', razorpay_payment_id
        }, { status: 400 })
    }

    return NextResponse.json({
        status: 200,
        message: 'Payment varified', razorpay_payment_id
    }, { status: 200 })
}