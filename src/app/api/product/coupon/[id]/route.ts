import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Coupon from '@/models/coupon';
import { adminToken } from "@/helpers/fetchToken";
import { cookies } from 'next/headers';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();

        // check admin token
        const cookie = cookies()
        const adminTokenExist = adminToken(cookie);

        if (!adminTokenExist) {
            return NextResponse.json({
                status: 400,
                message: 'Unauthorized',
            }, { status: 400 })
        }

        const data = await Coupon.findById(params.id);
        console.log(data)
        if (!data) {
            return NextResponse.json({
                status: 400,
                message: 'Coupon not found',
            }, { status: 400 })
        }
        else {
            return NextResponse.json({
                status: 200,
                message: 'Coupon Found', result: data
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();

        // check admin token
        const cookie = cookies()
        const adminTokenExist = adminToken(cookie);

        if (!adminTokenExist) {
            return NextResponse.json({
                status: 400,
                message: 'Unauthorized',
            }, { status: 400 })
        }

        const data = await Coupon.findByIdAndDelete(params.id);
        console.log(data)
        if (!data) {
            return NextResponse.json({
                status: 400,
                message: 'Coupon not Deleted',
            }, { status: 400 })
        }
        else {
            return NextResponse.json({
                status: 200,
                message: 'Coupon Deleted',
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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();

        // check admin token
        const cookie = cookies()
        const adminTokenExist = adminToken(cookie);

        if (!adminTokenExist) {
            return NextResponse.json({
                status: 400,
                message: 'Unauthorized',
            }, { status: 400 })
        }

        const {name,min_price,max_price,condition,discount,multiuse} = await req.json();
        const updateCouponData = {name,min_price,max_price,condition,discount,multiuse};

        const data = await Coupon.findByIdAndUpdate(params.id,updateCouponData);
        if (!data) {
            return NextResponse.json({
                status: 400,
                message: 'Coupon not Updated',
            }, { status: 400 })
        }
        else {
            return NextResponse.json({
                status: 200,
                message: 'Coupon Updated',
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