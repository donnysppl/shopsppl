import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Banner from "@/models/banner";
import { writeFile } from 'fs/promises';
import path from "path";


export async function POST(req: NextRequest) {
    try {
        await connect();
        const formData = await req.formData();
        const name = formData.get('name') as String;
        const order = formData.get('order') as String;
        const link = formData.get('link') as String;
        const bannerimg = formData.get('bannerimg') as File;
        const bannermobimg = formData.get('bannermobimg') as File;

        if(!bannerimg || !bannermobimg){
            return NextResponse.json({ error: "No files received." }, { status: 400 });
        }

        const bannerimgBuffer = Buffer.from(await bannerimg.arrayBuffer());
        const bannermobimgBuffer = Buffer.from(await bannermobimg.arrayBuffer());

        const bannerimgFilename = bannerimg.name.replaceAll(" ", "_");
        const bannermobimgFilename = bannermobimg.name.replaceAll(" ", "_");

        console.log(bannerimgFilename, bannermobimgFilename);

        await writeFile(
            path.join(process.cwd(), "public/uploads/banner/" + bannerimgFilename),
            bannerimgBuffer
        );
        await writeFile(
            path.join(process.cwd(), "public/uploads/banner/" + bannermobimgFilename),
            bannermobimgBuffer
        );

        const bannerData = new Banner({ name, order, link, bannerimg:bannerimgFilename, bannermobimg:bannermobimgFilename  })
        const saveData = await bannerData.save();
        console.log({ name, order, link, bannerimg:bannerimgFilename, bannermobimg:bannermobimgFilename })
        return NextResponse.json({
            status: 200,
            message: 'ok',result:saveData
        }, { status: 200 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connect();
        const formData = await req.formData();
        const name = formData.get('name') as String;
        const order = formData.get('order') as String;
        const link = formData.get('link') as String;
        const bannerimg = formData.get('bannerimg') as File;
        const bannermobimg = formData.get('bannermobimg') as File;

        if(!bannerimg && !bannermobimg){
            return NextResponse.json({ error: "No files received." }, { status: 400 });
        }

        const bannerimgBuffer = Buffer.from(await bannerimg.arrayBuffer());
        const bannermobimgBuffer = Buffer.from(await bannermobimg.arrayBuffer());

        const bannerimgFilename = bannerimg.name.replaceAll(" ", "_");
        const bannermobimgFilename = bannermobimg.name.replaceAll(" ", "_");

        console.log(bannerimgFilename, bannermobimgFilename);

        await writeFile(
            path.join(process.cwd(), "public/uploads/banner/" + bannerimgFilename),
            bannerimgBuffer
        );
        await writeFile(
            path.join(process.cwd(), "public/uploads/banner/" + bannermobimgFilename),
            bannermobimgBuffer
        );

        const bannerData = new Banner({ name, order, link, bannerimg:bannerimgFilename, bannermobimg:bannermobimgFilename  })
        const saveData = await bannerData.save();
        console.log({ name, order, link, bannerimg:bannerimgFilename, bannermobimg:bannermobimgFilename })
        return NextResponse.json({
            status: 200,
            message: 'ok',result:saveData
        }, { status: 200 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}