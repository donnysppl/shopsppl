import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import CustomProdPage from "@/models/custProdPage";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();

        const data = await CustomProdPage.findOne({_id:params.id});
        console.log(data)
        if (!data) {
            return NextResponse.json({
                status: 400,
                message: 'Page not found',
            }, { status: 400 })
        }
        else {
            return NextResponse.json({
                status: 200,
                message: 'Page Found', result:data
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();

        const data = await CustomProdPage.findByIdAndDelete(params.id);
        console.log(data)
        if (!data) {
            return NextResponse.json({
                status: 400,
                message: 'Page not Deleted',
            }, { status: 400 })
        }
        else {
            return NextResponse.json({
                status: 200,
                message: 'page Deleted',
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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();

        const {name, slug, metatitle, metadiscription, metakeyword, productIDs} = await req.json();
        const updatePageData = {name, slug, metatitle, metadiscription, metakeyword, productIDs};

        const data = await CustomProdPage.findByIdAndUpdate(params.id,updatePageData);

        if (!data) {
            return NextResponse.json({
                status: 400,
                message: 'Page not Updated',
            }, { status: 400 })
        }
        else {
            return NextResponse.json({
                status: 200,
                message: 'page updated', result:data
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

