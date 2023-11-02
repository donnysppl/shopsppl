import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import BlogsModal from '@/models/blog';

export async function GET(req: NextRequest,{ params }: { params: { slug: string } }) {
    try {
        await connect();

        const data = await BlogsModal.findOne({slug:params.slug});
        if(!data){
            return NextResponse.json({
                status: 400,
                message: 'data not found',
            }, { status: 400 })
        }
        else{
            return NextResponse.json({
                status: 200,
                message: 'Blog found', result:data
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