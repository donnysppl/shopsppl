import { NextRequest, NextResponse } from "next/server";
import CateSlider from '@/models/cateslider';
import { connect } from "@/dbConfig/dbConfig";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        await connect();
        const searchParams = req.nextUrl.searchParams;
        const categoryParams = searchParams.get('cate');
        
        const data = await CateSlider.findOne({category:categoryParams});
        console.log(categoryParams,data)
        if(!data){
            return NextResponse.json({
                status: 400,
                message: 'Data not Found',
            }, { status: 400 })
        }
        else{
            return NextResponse.json({
                status: 200,
                message: 'Data Found', result:data
            }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error,
        }, { status: 500 })
    }
}
