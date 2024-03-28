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
// page=undefined&limit=10&brand=thomson&category=all

function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    array.sort((a: any, b: any) => { return b.inStock - a.inStock })
    return array;
}

export async function GET(req: NextRequest) {
    try {
        await connect();
        const searchParams = req.nextUrl.searchParams;
        const pagesParams = searchParams.get('page');
        const limitParams = searchParams.get('limit');
        const brandParams = searchParams.get('brand');
        const categoryParams = searchParams.get('category');
        const priceParams = searchParams.get('price');
        const sizeParams = searchParams.get('size');

        if (pagesParams && limitParams) {

            const pages = parseInt(pagesParams);
            const limit = parseInt(limitParams);

            const filter = {} as { brand: string, category: string, isStatus: boolean, productSalePrice: {}, size:{} };

            if (brandParams && brandParams !== 'all') {
                filter.brand = brandParams;
            }

            if (categoryParams && categoryParams !== 'all') {
                filter.category = categoryParams;
            }

            if (priceParams && priceParams !== 'all') {
                const priceArr = priceParams.split("-")
                const minPriceLimit = priceArr[0]
                const maxPriceLimit = priceArr[1]
                filter.productSalePrice = { $gte: minPriceLimit, $lte: maxPriceLimit }
            }

            if(sizeParams && sizeParams !== 'all'){
                const sizeArr = sizeParams.split("-")
                const minSizeLimit = sizeArr[0]
                const maxSizeLimit = sizeArr[1]
                filter.size = { $gte: minSizeLimit, $lte: maxSizeLimit }
            }
            

            const startIndex = (pages - 1) * limit;
            const ensIndex = pages * limit;
            const data = await Product.find(filter)
            await shuffleArray(data);

            if (!data) {
                return NextResponse.json({
                    status: 400,
                    message: "Product Not Found",
                }, { status: 400 })
            }
            else {
                const result = {} as MyResultType;
                if (ensIndex < data.length) {
                    result.next = { page: pages + 1, limit: limit };
                }
                if (startIndex > 0) {
                    result.prev = { page: pages - 1, limit: limit };
                }
                result.result = data.slice(startIndex, ensIndex);
                const totalPosts = data.length;
                const totalPages = Math.ceil(totalPosts / limit);
                result.totalPosts = totalPosts;
                result.totalPages = totalPages


                return NextResponse.json({
                    status: 200,
                    message: "Successfull",
                    result: result
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