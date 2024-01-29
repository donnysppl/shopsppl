import { connect } from "@/dbConfig/dbConfig";
import ProductOrder from "@/models/orderProduct";
import { NextRequest, NextResponse } from "next/server";
import Nodemailer from 'nodemailer';
import { mailTransport } from '@/helpers/common';
import { render } from '@react-email/render';
import { OrderCompleteEmail } from "@/helpers/Email/email";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {

        await connect();

        const transporter = Nodemailer.createTransport(mailTransport);
        // const searchParams = req.nextUrl.searchParams;
        // const custId = searchParams.get('custID');
        // const ordID = searchParams.get('ordID');

        const orderData = await ProductOrder.findOne({ _id: '65b1fe3859d59a035f733105' });

        const emailHtml = render(OrderCompleteEmail({ orderData:orderData }));

        // mail option
        const mailOption = {
            from: process.env.MAIL_SMTP_USER,
            to: 'donny@sppl.ind.in',
            subject: "Order SuccessFully Purchase",
            html: emailHtml
        };

        const sendMail = await transporter.sendMail(mailOption);
        console.log("Message sent: %s", sendMail.messageId);



        return NextResponse.json({
            status: 200,
            message: 'success', result: orderData
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}