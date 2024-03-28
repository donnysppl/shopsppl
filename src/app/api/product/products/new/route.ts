import Product from '@/models/product';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { shuffleArray } from '@/helpers/common';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connect();
        const data = await Product.find({isNewProductData:true}).select('-discription -productimg -productrpd');
        await shuffleArray(data);

        if (!data) {
            return NextResponse.json({
                status: 400,
                message: "Data Empty",
            }, { status: 400 })
        }
        
        else {
            return NextResponse.json({
                status: 200,
                message: "Successfull",
                result: data
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