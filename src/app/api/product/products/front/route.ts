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
}

export const dynamic = 'force-dynamic';
// page=undefined&limit=10&brand=thomson&category=all

export async function GET(req: NextRequest) {
    try {
        await connect();
        const searchParams = req.nextUrl.searchParams;
        const pagesParams = searchParams.get('page');
        const limitParams = searchParams.get('limit');
        const brandParams = searchParams.get('brand');
        const categoryParams = searchParams.get('category');

        if (pagesParams && limitParams) {

            const pages = parseInt(pagesParams);
            const limit = parseInt(limitParams);

            const filter = {} as { brand: string, category: string };

            if (brandParams && brandParams !== 'all') {
                filter.brand = brandParams;
            }

            if (categoryParams && categoryParams !== 'all') {
                filter.category = categoryParams;
            }

            const startIndex = (pages - 1) * limit;
            const ensIndex = pages * limit;
            const data = await Product.find(filter)


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