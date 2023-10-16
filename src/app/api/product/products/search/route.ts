import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        await connect();
        const searchParams = req.nextUrl.searchParams;
        const searchQ = searchParams.get('q');
        console.log(searchQ)

        const data = await Product.find({"name":{$regex : ".*" + searchQ + ".*",$options:'i'}}).select('name _id slug');
        console.log(data)
        if(!data){
            return NextResponse.json({
                status: 400,
                message: "Data not found"
            }, { status: 400 })
        }
        else{
            return NextResponse.json({
                status: 200,
                message: 'Success',result:data
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