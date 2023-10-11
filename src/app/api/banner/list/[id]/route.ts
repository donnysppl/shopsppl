import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Banner from "@/models/banner";

export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
    try {
        await connect();
        const data = await Banner.findById(params.id);
        if(data){
            return NextResponse.json({
                status: 200,
                message: 'Banner Data Found',
                result:data
            }, { status: 200 })
        }
        else{
            return NextResponse.json({
                status: 400,
                message: 'Banner Data Not Found',
            }, { status: 400 })
        }
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}