import Brand from '@/models/brand';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const { name, img, slug } = await req.json();

        console.log({ name, img, slug })

        const userExist = await Brand.findOne({ slug })
        if (userExist) {
            return NextResponse.json({
                status: 400,
                message: 'Brand already exists',
            }, { status: 400 })
        }
        else {

            const newBrand = new Brand({ name, img, slug })
            const saveBrand = await newBrand.save();
            console.log(saveBrand)

            return NextResponse.json({
                status: 200,
                message: 'Brand created Successfully',
                success: true,
                result: saveBrand,
            }, { status: 200 })

        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: error,
        }, { status: 500 })
    }
}

export async function GET() {
    try {
        await connect();
        const data = await Brand.find();
        console.log(data);
        if (!data) {
            return NextResponse.json({
                status: 400,
                message: "Data Empty",
            }, { status: 400 })
        }
        else {
            return NextResponse.json({
                status: 200,
                message: "Successfull",
                result: data
            }, { status: 200 })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: error,
        }, { status: 500 })
    }
}

// brand?id=64b52e0ec1c322b44520f07c 
export async function DELETE(req: NextRequest) {

    try {
        await connect();
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        const brandExist = await Brand.findOne({ id })

        const deleteBrand = await Brand.findByIdAndDelete(id);

        if (deleteBrand) {
            return NextResponse.json({
                status: 200,
                message: 'Brand Deleted',
            }, { status: 200 })
        }
        else {
            return NextResponse.json({
                status: 400,
                message: 'Brand Not Deleted',
            }, { status: 400 })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: error,
        }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connect();
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        const { name, slug, img } = await req.json();
        const updateBrandData = { name, slug, img };
       
        const brandExist = await Brand.findOne({ id })
        if(!brandExist){
            return NextResponse.json({
                status: 400,
                message: 'Brand Not Exist',
            }, { status: 400 })
        }
        const updateeBrand = await Brand.findByIdAndUpdate(id,updateBrandData);
        console.log(updateeBrand)

        if (updateeBrand) {
            return NextResponse.json({
                status: 200,
                message: 'Brand Updated',
            }, { status: 200 })
        }
        else {
            return NextResponse.json({
                status: 400,
                message: 'Brand Not Updated',
            }, { status: 400 })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: error,
        }, { status: 500 })
    }
}