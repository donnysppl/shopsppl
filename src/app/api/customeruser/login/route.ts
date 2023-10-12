import { connect } from "@/dbConfig/dbConfig";
import Customer from '@/models/customerUser';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendOtp } from "@/helpers/sendOTP";


export async function POST(req: NextRequest) {
    try {
        await connect();
        const { email, password } = await req.json();
        console.log({ email, password })
        const customerExist = await Customer.findOne({ email });
        console.log(customerExist)
        if (!customerExist) {
            return NextResponse.json({
                status: 400,
                message: 'User Not exist',
            }, { status: 400 })
        } else {
            if (!customerExist.password) {
                return NextResponse.json({
                    status: 400,
                    message: 'Please Forgot your password',
                }, { status: 400 })
            }
            else {
                const validPassword = await bcryptjs.compare(password, customerExist.password)
                if (!validPassword) {
                    return NextResponse.json({
                        status: 400,
                        message: 'Wrong Password',
                    }, { status: 400 })
                }
                else {
                    const sendOTP = await sendOtp(email, customerExist._id);
                    return NextResponse.json({
                        status: 200,
                        message: 'Check the mail for otp',
                        mail: sendOTP,
                        result: customerExist
                    }, { status: 200 })
                }
            }

        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}