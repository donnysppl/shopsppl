import Product from '@/models/product';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export async function PUT(res: NextRequest, { params }: { params: { id: string }}) {
    try {
        await connect();

        const fetchData = await Product.findOne({_id:params.id})

        let data = null;
        if(fetchData.isNewProductData){
            data = await Product.findByIdAndUpdate({_id:params.id},{isNewProductData:false})
        }
        else{
            data = await Product.findByIdAndUpdate({_id:params.id},{isNewProductData:true})
        }
       
        if (!data) {
            return NextResponse.json({
                status: 400,
                message: "Data Not Updated",
            }, { status: 400 })
        }
        
        else {
            return NextResponse.json({
                status: 200,
                message: "Data Updated",
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