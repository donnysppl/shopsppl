import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Coupon from '@/models/coupon';

export async function POST(req: NextRequest) {
    try {
        await connect();
        const {name,min_price,max_price,condition} = await req.json();
        const couponExist = await Coupon.find({name:name});
        console.log(couponExist)
        if(couponExist.length > 0){
            return NextResponse.json({
                status: 400,
                message: 'Coupon Exist',
            }, { status: 400 })
        }
        else{
            const newCoupon = new Coupon({name,min_price,max_price,condition});
            const saveCoupon = await newCoupon.save();
            return NextResponse.json({
                status: 200,
                message: 'Coupon Created', result:saveCoupon
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

export async function GET(req: NextRequest) {
    try {
        await connect();
        const data = await Coupon.find();
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