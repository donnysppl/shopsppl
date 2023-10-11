import { NextRequest, NextResponse } from "next/server";
import CustomerOTPVerification from '@/models/customerOTPVerify';
import bcryptjs from 'bcryptjs';
import Customer from '@/models/customerUser';
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const { customerID, otp } = await req.json();
        const searchParams = req.nextUrl.searchParams;
        const customerfunc = searchParams.get('customerfunc');
        console.log(customerfunc, customerID, otp)
        if (!customerID || !otp) {
            return NextResponse.json({
                status: 400,
                message: 'Please Fill the data properly',
            }, { status: 400 })
        }
        else {
            const custOTPVeriRecord = await CustomerOTPVerification.find({ customerID });
            if (!custOTPVeriRecord) {
                // no record found
                return NextResponse.json({
                    status: 400,
                    message: "Account Record doesn't exist or has been verified already. Please sign up or login",
                }, { status: 400 })
            }
            else {
                await Customer.updateOne({ _id: customerID }, { isVarified: false }) as any;
                // user otp record exists
                const { expiredAt } = custOTPVeriRecord[0];
                const hashedOTP = custOTPVeriRecord[0].otp;

                if (expiredAt < Date.now()) {
                    // user otp record has expired
                    await CustomerOTPVerification.deleteMany({ customerID });
                    return NextResponse.json({
                        status: 400,
                        message: "Code has expired. Please request again.",
                    }, { status: 400 })
                } else {
                    const validOTP = await bcryptjs.compare(otp, hashedOTP);

                    if (!validOTP) {
                        // supplied otp is wrong
                        return NextResponse.json({
                            status: 400,
                            message: "Invalid code passed. Check your inbox.",
                        }, { status: 400 })
                    }
                    else {
                        // success
                        if (customerfunc === 'login') {
                            await Customer.updateOne({ _id: customerID }, { isVarified: true }) as any;
                            const findCustomer = await Customer.findOne({ _id: customerID });
                            await CustomerOTPVerification.deleteMany({ customerID });
                            const tokenData = {
                                id: findCustomer._id,
                                username: findCustomer.username,
                                email: findCustomer.email
                            }
                            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
                            console.log(tokenData)
                            const result = NextResponse.json({
                                message: "User verified successfully.",
                                status: 200,
                                success: true, token
                            }, { status: 200, })

                            result.cookies.set("customer-token", token, {
                                httpOnly: true,
                            })
                            return result;
                        }
                        else if (customerfunc === 'forgot-password') {
                            await Customer.updateOne({ _id: customerID }, { isVarified: true }) as any;
                            return NextResponse.json({
                                message: "Password Updated",
                                status: 200,
                                success: true,
                            }, { status: 200, })
                        }
                        else {
                            return NextResponse.json({
                                message: "User verified successfully.",
                                status: 200,
                                success: true,
                            }, { status: 200, })
                        }

                    }
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