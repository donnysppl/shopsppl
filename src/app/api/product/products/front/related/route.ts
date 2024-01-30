import Product from '@/models/product';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";


export const dynamic = 'force-dynamic';

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
        const relatedParams = searchParams.get('r');
        const prodData = await Product.findOne({ _id: relatedParams });

        const similarProducts = await Product.find({
            _id: { $ne: prodData },
            category: { $all: prodData.category }
        });

        shuffleArray(similarProducts);

        const limitRandom = await similarProducts.slice(0, 4);

        return NextResponse.json({
            status: 200,
            message: 'done ', result: limitRandom,
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}