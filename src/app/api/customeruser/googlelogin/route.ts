import { connect } from "@/dbConfig/dbConfig";
import Customer from '@/models/customerUser';
import jwt from "jsonwebtoken";;
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const { username, email } = await req.json();
        console.log({ username, email })

        const customerExist = await Customer.findOne({ email: email });

        if (!customerExist) {
            const newCustomer = new Customer({ username, email,isVarified: true  });
            newCustomer.save()
            const tokenData = {
                id: newCustomer._id,
                username: newCustomer.username,
                email: newCustomer.email
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
            const result = NextResponse.json({
                message: "User login successfully.",
                status: 200,
                success: true, token
            }, { status: 200, })

            result.cookies.set("customer-token", token, {
                httpOnly: true,
            })
            return result;
        }
        else {

            const tokenData = {
                id: customerExist._id,
                username: customerExist.username,
                email: customerExist.email
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
            const result = NextResponse.json({
                message: "User login successfully.",
                status: 200,
                success: true, token
            }, { status: 200, })

            result.cookies.set("customer-token", token, {
                httpOnly: true,
            })
            return result;
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}