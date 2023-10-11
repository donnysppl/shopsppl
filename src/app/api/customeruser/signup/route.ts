import { connect } from "@/dbConfig/dbConfig";
import Customer from '@/models/customerUser';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendOtp } from "@/helpers/sendOTP";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const { username, email, password, phone, isWhatsappNo } = await req.json();
        console.log({ username, email, password, phone, isWhatsappNo });
        // check the user 
        const CustomerExist = await Customer.findOne({ email });

        if (CustomerExist) {
            return NextResponse.json({
                status: 400,
                message: 'Customer already exists',
            }, { status: 400 })
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // add user
        const newCustomer = new Customer({
            username, email, phone, isWhatsappNo,
            password: hashedPassword, isVarified: false
        })
        const saveCustomer = await newCustomer.save();
        const sendOTP = await sendOtp(email,saveCustomer._id);
        return NextResponse.json({
            status: 200,
            message: 'Done',
            result: saveCustomer,
            mail: sendOTP

        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}
