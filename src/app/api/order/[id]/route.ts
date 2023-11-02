import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import ProductOrder from "@/models/orderProduct";
import { adminToken } from "@/helpers/fetchToken";
import { cookies } from 'next/headers';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();

        // check admin token
        const cookie = cookies()
        const adminTokenExist = adminToken(cookie);

        if(!adminTokenExist){
            return NextResponse.json({
                status: 400,
                message: 'Unauthorized',
            }, { status: 400 })
        }
        const orderData = await ProductOrder.findById(params.id);
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