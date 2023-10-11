import Product from '@/models/product';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

// {
//     "name":"product name",
//     "slug":"product name",
//     "metatitle":"product name",
//     "metadiscrip":"product name",
//     "metakeyword":"product name",
//     "category":"product name",
//     "categoryslug":"product name",
//     "parentcategory":"product name",
//     "model":"product name",
//     "shortdiscrip":"product name",
//     "discription":"product name",
//     "mainproductimg":"product name",
//     "productimg":["product name","product name"],
//     "productrpd":["product name","product name"],
//     "productNormalPrice":9999,
//     "productSalePrice":6999,
//     "productPriceDiffAmt":3000,
//     "productPriceDiffpercent": 30,
//     "isPublish":true,
//     "isStatus":true,
//     "isFeatured":true
// }

// {name, slug, metatitle, metadiscrip, metakeyword, category, categoryslug, parentcategory, model, shortdiscrip, discription, mainproductimg, productimg, productrpd, productNormalPrice, productSalePrice, productPriceDiffAmt, productPriceDiffpercent, isPublish, isStatus, isFeatured}


export async function GET() {
    try {
        await connect();
        const data = await Product.find();
        if (!data) {
            return NextResponse.json({
                status: 400,
                message: "Data Empty",
            }, { status: 400 })
        }
        else {
            return NextResponse.json({
                status: 200,
                message: "Successfull",
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