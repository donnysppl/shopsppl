import Product from '@/models/product';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import CustomerAdmin from '@/models/customerUser';

export async function POST(req: NextRequest) {
    try {
        await connect();
        const searchParams = req.nextUrl.searchParams;
        const userID = searchParams.get('user');
        const data = await req.json();
        console.log(data, userID)
        const updateCartCustmer = await CustomerAdmin.updateOne({ _id: userID }, {
            $push: {cart: data}
        })
        
        console.log(updateCartCustmer);

        if (!updateCartCustmer) {
            return NextResponse.json({
                status: 400,
                message: 'Cart Not Updated',
            }, { status: 400 })
        }
        else{
            return NextResponse.json({
                status: 200,
                message: 'Cart Updated', result:updateCartCustmer,
            }, { status: 200 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: error,
        }, { status: 500 })
    }
}