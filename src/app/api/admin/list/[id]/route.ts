import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Admin from "@/models/adminUser";

export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
    try {
        await connect();
        const data = await Admin.findById(params.id);
        if(data){
            return NextResponse.json({
                status: 200,
                message: 'Admin Data Found',
                result:data
            }, { status: 200 })
        }
        else{
            return NextResponse.json({
                status: 400,
                message: 'Admin Data Not Found',
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