import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import CateSlider from '@/models/cateslider';
import { cookies } from 'next/headers';
import { adminToken } from "@/helpers/fetchToken";
import { connect } from "@/dbConfig/dbConfig";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    await connect();
    const data = await req.formData();

    const file: File | null = data.get('file') as unknown as File;
    const resfile: File | null = data.get('resfile') as unknown as File;

    const category: String = data.get('category') as string;
    const slide: String = data.get('slide') as string;
    const buylink: String = data.get('buylink') as string;

    const date = new Date();

    console.log({
        category, slide, buylink, file, resfile
    })

    if (!file && !resfile) {
        return NextResponse.json({
            status: 400,
            message: 'File not found',
        }, { status: 400 })
    }

    const byteData = await file.arrayBuffer();
    const byteDataRes = await resfile.arrayBuffer();

    const buffer = Buffer.from(byteData);
    const bufferRes = Buffer.from(byteDataRes);

    const pathFolder = 'public/uploads/homepage'
    if (!fs.existsSync(pathFolder)) {
        fs.mkdirSync(pathFolder, { recursive: true });
        console.log('folder created');
    }

    const path = `./public/uploads/homepage/${date.getTime() + file.name}`;
    const pathRes = `./public/uploads/homepage/${date.getTime() + resfile.name}`;

    const pathLink = `/uploads/homepage/${date.getTime() + file.name}`;
    const pathResLink = `/uploads/homepage/${date.getTime() + resfile.name}`;

    await writeFile(path, buffer);
    await writeFile(pathRes, bufferRes);

    const cateSliderExist = await CateSlider.findOne({ category: category });
    if (!cateSliderExist) {
        const cateSlideData = new CateSlider({ category: category });
        cateSlideData.categorySlider.push({ slide, buylink, file: pathLink, resfile: pathResLink });
        const saveCateSlider = await cateSlideData.save();
        return NextResponse.json({
            status: 200,
            message: 'File upload', result: saveCateSlider
        }, { status: 200 })
    }
    else {
        cateSliderExist.categorySlider.push({ slide, buylink, file: pathLink, resfile: pathResLink });
        const saveCateSlider = await cateSliderExist.save();
        return NextResponse.json({
            status: 200,
            message: 'File upload', result: saveCateSlider
        }, { status: 200 })
    }
}

export async function GET(req: NextRequest) {
    try {
        // check admin token
        const cookie = cookies()
        const adminTokenExist = adminToken(cookie);

        if (!adminTokenExist) {
            return NextResponse.json({
                status: 400,
                message: 'Unauthorized',
            }, { status: 400 })
        }

        await connect();
        const data = await CateSlider.find();
        if (!data) {
            return NextResponse.json({
                status: 400,
                message: 'Data not Found',
            }, { status: 400 })
        }
        else {
            return NextResponse.json({
                status: 200,
                message: 'Data Found', result: data
            }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error,
        }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        // check admin token
        const cookie = cookies()
        const adminTokenExist = adminToken(cookie);

        if (!adminTokenExist) {
            return NextResponse.json({
                status: 400,
                message: 'Unauthorized',
            }, { status: 400 })
        }

        await connect();

        const searchParams = req.nextUrl.searchParams;
        const parCateSliderParams = searchParams.get('p_cateSlide');
        const childCateSliderParams = searchParams.get('ch_cateSlide');

        console.log(searchParams)

        const cateSlideExist = await CateSlider.findOne({_id:parCateSliderParams});
        if(!cateSlideExist){
            return NextResponse.json({
                status: 400,
                message: 'Data not found',
            }, { status: 400 })
        }
        else{
            const filterData = cateSlideExist.categorySlider.filter((item:any) => item._id.toString() === childCateSliderParams);

            const filterDataFile = './public' + filterData[0]?.file;
            const filterDataResFile = './public' + filterData[0]?.resfile;

            fs.unlinkSync(filterDataFile);
            fs.unlinkSync(filterDataResFile);
           
            const updateCateSlider = await CateSlider.updateOne({_id:parCateSliderParams},
                {$pull:{categorySlider:{_id:childCateSliderParams}}})

                return NextResponse.json({
                    status: 200,
                    message: 'Data Deleted', result:updateCateSlider
                }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error,
        }, { status: 500 })
    }

}