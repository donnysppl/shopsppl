import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import ProductOrder from "@/models/orderProduct";

export const revalidate = 0

export async function GET(req: NextRequest) {
    try {
        await connect();
        const orderData = await ProductOrder.find();
        if (!orderData) {
            return NextResponse.json({
                status: 400,
                message: 'Data Not Found',
            }, { status: 400 })
        }
        else {
            return NextResponse.json({
                status: 200,
                message: 'Data Found', result: orderData,
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