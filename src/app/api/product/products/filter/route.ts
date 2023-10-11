import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        await connect();
        const searchParams = req.nextUrl.searchParams;
        const brandQuery = searchParams.get('brand');
        const categoryQuery = searchParams.get('category');
        console.log({ brand: brandQuery, category: categoryQuery })
        const filter = {} as {brand : string, category : string};

        if (brandQuery && brandQuery !== 'all') {
            filter.brand = brandQuery;
        }

        if (categoryQuery && categoryQuery !== 'all') {
            filter.category = categoryQuery;
        }

        const filterProduct = await Product.find(filter)

        return NextResponse.json({
            status: 200,
            result: filterProduct,
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}