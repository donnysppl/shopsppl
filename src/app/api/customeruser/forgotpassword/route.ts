import { connect } from "@/dbConfig/dbConfig";
import Customer from '@/models/customerUser';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendOtp } from "@/helpers/sendOTP";

export async function PUT(req: NextRequest) {
    try {
        await connect();
        const { email, password } = await req.json();
        console.log(email, password)
        const customerExist = await Customer.findOne({ email });

        if (!customerExist) {
            return NextResponse.json({
                status: 400,
                message: 'Customer Not Exist',
            }, { status: 400 })
        }
        else {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);
            const sendOTP = await sendOtp(email , customerExist._id);
            const passUpdate = await Customer.findByIdAndUpdate(customerExist._id, {password:hashedPassword,isVarified:false})

            return NextResponse.json({
                status: 200,
                message: 'Please Verify your OTP', result:passUpdate, mail:sendOTP
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