import CollectionProd from '@/models/collectionprod';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from '@/models/product';
import { shuffleArray } from '@/helpers/common';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    try {

        const collDataExist = await CollectionProd.findOne({ slug: params.slug });
        if (!collDataExist) {
            return NextResponse.json({
                status: 400,
                message: "Data not exist",
            }, { status: 400 })
        }

        if (collDataExist.condition && collDataExist.conditiomfilter) {


            const category = collDataExist.condition;
            const categoryData = collDataExist.conditiomfilter

            const filter = {} as { category: string, productSalePrice: {}, };

            if (category === 'category') {
                filter.category = categoryData
            }

            if (category === 'price') {
                const priceArr = categoryData.split("-")
                const minPriceLimit = priceArr[0]
                const maxPriceLimit = priceArr[1]
                filter.productSalePrice = { $gte: minPriceLimit, $lte: maxPriceLimit }
            }
            
            const data = await Product.find(filter).select('-discription -productimg -productrpd')
            await shuffleArray(data);

            if (!data) {
                return NextResponse.json({
                    status: 400,
                    message: "Product Not Found",
                }, { status: 400 })
            }

            else {
                return NextResponse.json({
                    status: 200,
                    message: "Successfull",
                    result: collDataExist,
                    productdata: data
                }, { status: 200 })
            }
        }

        return NextResponse.json({
            status: 200,
            message: "Successfull",
        }, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}