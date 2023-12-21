import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import CustomProdPage from "@/models/custProdPage";
import Product from "@/models/product";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }){
    try {
        await connect();
        const data = await CustomProdPage.findOne({slug:params.slug});
        if (!data) {
            return NextResponse.json({
                status: 400,
                message: 'Page not found',
            }, { status: 400 })
        }
        else {

            const prodData = data.productIDs;
            const prodId = [];

            for (let i = 0; i < prodData.length; i++) {
                prodId.push(prodData[i]._id)
            }
            const findProd = await Product.find({ _id: { $in: prodId } }).select('_id name slug model mainproductimg inStock productNormalPrice productSalePrice productPriceDiffAmt productPriceDiffpercent isPublish isStatus isFeatured');


            return NextResponse.json({
                status: 200,    
                message: 'Page Found', result:data, product : findProd
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