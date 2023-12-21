import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import CustomProdPage from "@/models/custProdPage";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const { name, slug, metatitle, metadiscription, metakeyword, productIDs } = await req.json();

        const pageExist = await CustomProdPage.findOne({ slug: slug });

        console.log(pageExist)

        if (pageExist) {
            return NextResponse.json({
                status: 400,
                message: 'Page already exist',
            }, { status: 400 })
        }
        else {
            const newPage = new CustomProdPage({ name, slug, metatitle, metadiscription, metakeyword, productIDs });
            const savePage = await newPage.save();
            return NextResponse.json({
                status: 200,
                message: 'Page created Successfully',
                success: true,
                result: savePage,
            }, { status: 200 })
        }

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error,
        }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        await connect();
        const pageExist = await CustomProdPage.find();

        if(!pageExist){
            return NextResponse.json({
                status: 400,
                message: 'Page not exist',
            }, { status: 400 })
        }
        else{
            return NextResponse.json({
                status: 200,
                message: 'Page Found Successfully',
                success: true,
                result: pageExist,
            }, { status: 200 })
        }

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error,
        }, { status: 500 })
    }
}