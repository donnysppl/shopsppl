import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Banner from "@/models/banner";
import fs from "fs";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const data = await Banner.findById(params.id);
        if (data) {
            console.log(data);
            const bannerimg = data.bannerimg;
            const bannermobimg = data.bannermobimg;
            if (bannerimg && bannermobimg) {
                if (fs.existsSync(bannerimg) && fs.existsSync(bannermobimg)) {
                    fs.rmSync(bannerimg, { recursive: true })
                    fs.rmSync(bannermobimg, { recursive: true })
                }
            }
            await Banner.findByIdAndDelete(params.id);
            return NextResponse.json({
                status: 200,
                message: 'Banner Data Deleled',
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