import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import PagesModel from '@/models/pages';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }){
    try {
        await connect();
        const pagesData = await PagesModel.find({slug : params.slug});
        if(!pagesData){
            return NextResponse.json({
                status: 400,
                message: 'Data not Found',
            }, { status: 400 })
        }
        else{
            return NextResponse.json({
                status: 200,
                message: 'Data Found', result:pagesData,
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