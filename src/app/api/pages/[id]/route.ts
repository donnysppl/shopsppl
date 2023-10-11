import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import PagesModel from '@/models/pages';

export async function GET(req: NextRequest, { params }: { params: { id: string } }){
    try {
        await connect();
        const pagesData = await PagesModel.findById({_id : params.id});
        if(!pagesData){
            return NextResponse.json({
                status: 400,
                message: 'Data not Found',
            }, { status: 400 })
        }
        else{
            return NextResponse.json({
                status: 200,
                message: 'Data Found', result:pagesData,
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
        const {pagename,pagedata,metatitle,metadiscription,metakeyword,slug} = await req.json();
        const prevPageData = await PagesModel.findById({_id : params.id});

        const updateData = {
            pagename,pagedata,metatitle,metadiscription,metakeyword,slug
        }

        const updatePageData = await PagesModel.findByIdAndUpdate(params.id,updateData);

        if(!updatePageData){
            return NextResponse.json({
                status: 400,
                message: 'Data not Saved',
            }, { status: 400 })
        }
        else{
            return NextResponse.json({
                status: 200,
                message: 'Data Updated', result:updatePageData,
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }){
    try {
        await connect();
        const pagesData = await PagesModel.findByIdAndDelete({_id : params.id})
        if(!pagesData){
            return NextResponse.json({
                status: 400,
                message: 'Data not Delete',
            }, { status: 400 })
        }
        else{
            return NextResponse.json({
                status: 200,
                message: 'Data Deleted', result:pagesData,
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