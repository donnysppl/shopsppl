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
            message: 'Somthing went wrong ' + error,
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
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}

