import Product from '@/models/product';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(res: NextRequest, { params }: { params: { slug: string }}) {
    try {
        await connect();

        const data = await Product.find({slug : params.slug});
        if (!data) {
            return NextResponse.json({
                status: 400,
                message: "Product Not Found",
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
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}
