import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import ProductOrder from "@/models/orderProduct";

export async function PUT(req: NextRequest) {
    try {
        await connect();
        const data = await req.json();
        console.log(data)

        return NextResponse.json({
            status: 200,
            message: 'success' , result:data
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}