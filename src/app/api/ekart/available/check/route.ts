import { NextRequest, NextResponse } from "next/server";
import EkartPincode from '@/models/ekartpincode';
import { connect } from "@/dbConfig/dbConfig";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const {pincode} = await req.json();
        const EkartData = await EkartPincode.findOne({pincode:pincode,status:true});

        if(!EkartData){
            return NextResponse.json({
                status: 400,
                message: 'Sorry, we cannot deliver to this area.',
            }, { status: 400 })
        }
        return NextResponse.json({
            status: 200,
            message: 'Success',
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: error,
        }, { status: 500 })
    }

}