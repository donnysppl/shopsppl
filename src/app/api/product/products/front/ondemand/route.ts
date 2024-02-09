import Product from '@/models/product';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

interface MyResultType {
    result: any[];
    next: {
        page: number;
        limit: number;
    };
    prev: {
        page: number;
        limit: number;
    };
    totalPosts: number;
    totalPages: number;
}

export const dynamic = 'force-dynamic';
// page=1&limit=1&pt=tv&ct=24inch,32inch,40inch,42inch,43inch,50inch,55inch

function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


export async function GET(req: NextRequest) {
    try {

        await connect();

        const searchParams = req.nextUrl.searchParams;
        const tagParentParams = searchParams.get('pt');
        const tagChildParams = searchParams.get('ct');
        const pagesParams = searchParams.get('page');
        const limitParams = searchParams.get('limit');

        if (pagesParams && limitParams) {

            const pages = parseInt(pagesParams);
            const limit = parseInt(limitParams);

            const result = {} as MyResultType;


            if (tagChildParams) {
                const prodChildTagStr = tagChildParams.toString();
                const prodChildTagArr = prodChildTagStr.split(",");

                const data = await Product.find({
                    $and: [
                        { tag: tagParentParams },
                        { tag: { $in: prodChildTagArr } }
                    ]
                }).select('name slug tag mainproductimg productNormalPrice productSalePrice productPriceDiffAmt productPriceDiffpercent isStatus inStock');

                await shuffleArray(data);


                const startIndex = (pages - 1) * limit;
                const ensIndex = pages * limit;

                if (ensIndex < data.length) {
                    result.next = { page: pages + 1, limit: limit };
                }
                if (startIndex > 0) {
                    result.prev = { page: pages - 1, limit: limit };
                }

                const totalPosts = data.length;
                result.result = data.slice(startIndex, ensIndex);
                const totalPages = Math.ceil(totalPosts / limit);
                result.totalPosts = totalPosts;
                result.totalPages = totalPages


                return NextResponse.json({
                    status: 200,
                    message: "Successfull",
                    result
                }, { status: 200 })
            }

        }



    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}