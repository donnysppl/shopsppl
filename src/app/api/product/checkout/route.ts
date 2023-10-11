import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/product";

export async function GET(req: NextRequest) {
    try {
        await connect();
        const searchParams = req.nextUrl.searchParams;
        const productQuery = searchParams.get('product') as string;
        if(!productQuery){
            return NextResponse.json({
                status: 400,
                message: 'Please Select the product'
            }, { status: 400 })
        }
        const productQueryArr = productQuery.split(",");
        const findProd = await Product.find({ _id: { $in: productQueryArr } });
        if(!findProd){
            return NextResponse.json({
                status: 400,
                message: 'Data Not Found'
            }, { status: 400 })
        }
        return NextResponse.json({
            status: 200,
            message: 'Success', result: findProd,
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}