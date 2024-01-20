import { connect } from "@/dbConfig/dbConfig";
import ProductOrder from "@/models/orderProduct";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {

        await connect();
        const searchParams = req.nextUrl.searchParams;
        const custId = searchParams.get('custID');
        const ordID = searchParams.get('ordID');

        const orderData = await ProductOrder.findOne({_id : ordID});





        return NextResponse.json({
            status: 200,
            message: 'success' ,custId,ordID,orderData
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}