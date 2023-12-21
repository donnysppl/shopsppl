import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Banner from "@/models/banner";
import fs from "fs";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const { name, bannerimg, bannermobimg, order, link } = await req.json();

        const dataExist = await Banner.findOne({_id : params.id})

        if(!dataExist){
            return NextResponse.json({
                status: 400,
                message: 'Banner Data not Exist',
            }, { status: 400 })
        }


        if (!name || !bannerimg || !bannermobimg) {
            return NextResponse.json({
                status: 400,
                message: 'Please Enter data properly',
            }, { status: 400 })
        }else{
            const newBanner = new Banner({
                name, bannerimg, bannermobimg, order, link
            })
            const saveBanner = await newBanner.save();
    
            return NextResponse.json({
                status: 200,
                message: 'Banner Added Successfully',
                result: saveBanner
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
