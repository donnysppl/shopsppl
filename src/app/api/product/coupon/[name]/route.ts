import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Coupon from '@/models/coupon';

export async function GET(req: NextRequest, { params }: { params: { name: string }}) {
    try {
        await connect();
        const data = await Coupon.findOne({name:params.name});
        console.log(data)
        if(!data){
            return NextResponse.json({
                status: 400,
                message: 'Coupon not found',
            }, { status: 400 })
        }
        else{
            return NextResponse.json({
                status: 200,
                message: 'Coupon Found', result:data
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