import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Banner from "@/models/banner";
import fs from "fs";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const prevData = await Banner.findById(params.id);
        const formData = await req.formData();
        const name = formData.get("name");
        const order = formData.get("order");
        const link = formData.get("link");
        const bannerimgData = formData.get("bannerimg") as File | null;
        const bannermobimgData = formData.get("bannermobimg") as File | null;
        console.log(bannerimgData, bannermobimgData)

        const bannerFolder = 'public/uploads/banner/'
        if (!fs.existsSync(bannerFolder)) {
            fs.mkdirSync(bannerFolder, { recursive: true });
            console.log('banner folder created');
        }

        var updatebannerRec = null;
        if ((bannerimgData != null) && (bannermobimgData != null)) {
            console.log('first')
            // await fs.unlink(prevData.bannerimg, (err => {
            //     console.log(err)
            // }))
            // await fs.unlink(prevData.bannermobimg, (err => {
            //     console.log(err)
            // }))

            const bannerimgBuff = Buffer.from(await bannerimgData.arrayBuffer());
            const bannermobimgBuff = Buffer.from(await bannermobimgData.arrayBuffer());
            const bannerimg = Date.now() + bannerimgData.name.replaceAll(" ", "_");
            const bannermobimg = Date.now() + bannermobimgData.name.replaceAll(" ", "_");

            fs.writeFileSync(bannerFolder + bannerimg, bannerimgBuff);
            fs.writeFileSync(bannerFolder + bannermobimg, bannermobimgBuff);

            console.log({
                name, order, link,
                bannerimg: 'uploads/banner/' + bannerimg,
                bannermobimg: 'uploads/banner/' + bannermobimg
            })

            updatebannerRec = {
                name, order, link,
                bannerimg: 'uploads/banner/' + bannerimg,
                bannermobimg: 'uploads/banner/' + bannermobimg
            }
        }
        else if (bannerimgData != null) {
            console.log('second')
            fs.unlink(prevData.bannerimg, (err => {
                console.log(err)
            }))
            const bannerimgBuff = Buffer.from(await bannerimgData.arrayBuffer());
            const bannerimg = Date.now() + bannerimgData.name.replaceAll(" ", "_");
            fs.writeFileSync(bannerFolder + bannerimg, bannerimgBuff);
            updatebannerRec = {
                name, order, link,
                bannerimg: 'uploads/banner/' + bannerimg,
                bannermobimg: prevData.bannermobimg
            }
        }
        else if (bannermobimgData != null) {
            console.log('three')
            fs.unlink(prevData.bannermobimg, (err => {
                console.log(err)
            }))
            const bannermobimgBuff = Buffer.from(await bannermobimgData.arrayBuffer());
            const bannermobimg = Date.now() + bannermobimgData.name.replaceAll(" ", "_");
            fs.writeFileSync(bannerFolder + bannermobimg, bannermobimgBuff);
            updatebannerRec = {
                name, order, link,
                bannerimg: prevData.bannerimg,
                bannermobimg: 'uploads/banner/' + bannermobimg,
            }
        }
        else {
            console.log('else')
            updatebannerRec = {
                name, order, link
            }
        }
        console.log(updatebannerRec);

        const newBannerData = await Banner.findByIdAndUpdate(params.id,updatebannerRec)
        console.log(newBannerData)

        if (newBannerData) {
            return NextResponse.json({
                status: 200,
                message: 'Banner Data Updated',
                result: newBannerData
            }, { status: 200 })
        }
        else {
            return NextResponse.json({
                status: 400,
                message: 'Somthing went wrong ',
            }, { status: 400 })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}