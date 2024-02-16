import Product from '@/models/product';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { Product as ProdInter } from '@/helpers/interFace';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        await connect();
        const data = await Product.findOne({ slug: params.slug });

        if (!data) {
            return NextResponse.json({
                status: 400,
                message: "Product Not Found",
            }, { status: 400 })
        }
        else {

            const result = {} as {product:ProdInter,sizeAvai:Boolean,sizes:any}
            result.product = data;

            if(data.sizeAvai){

                result.sizeAvai = true

                const findSizesProd = await Product.find({ productSeries: data.productSeries }).select('name slug size');
                if (findSizesProd.length !== 0) {
                    findSizesProd.sort((a, b) => a.size - b.size);
                    result.sizes = findSizesProd
                }
            }
            else{
                result.sizeAvai = false
            }

            
            return NextResponse.json({
                status: 200,
                message: "Successfull",
                result: result
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