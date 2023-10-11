import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import PagesModel from '@/models/pages';

export async function POST(req: NextRequest) {
    try {
        await connect();
        const {pagename,pagedata,metatitle,metadiscription,metakeyword,slug} = await req.json();
        const checkPageData = await PagesModel.find({slug:slug});
        if(checkPageData.length > 0){
            return NextResponse.json({
                status: 400,
                message: 'Data already exist',
            }, { status: 400 })
        }
        else{
            const newPageData = new PagesModel({pagename,pagedata,metatitle,metadiscription,metakeyword,slug});
            const savepageData = await newPageData.save();
    
            if(!savepageData){
                return NextResponse.json({
                    status: 400,
                    message: 'Data not Saved',
                }, { status: 400 })
            }
            else{
                return NextResponse.json({
                    status: 200,
                    message: 'Saved', result:savepageData,
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

export async function GET(req: NextRequest){
    try {
        await connect();
        const pagesData = await PagesModel.find();
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