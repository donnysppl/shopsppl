import Brand from '@/models/brand';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

// brand/${id}  
export async function GET(req: NextRequest, next: any) {
    try {
        await connect();
        const id = next.params.id;
        const brandExist = await Brand.findById(id);

        console.log(id, brandExist)

        if (!brandExist) {
            return NextResponse.json({
                status: 400,
                message: "Brand Not Found",
            }, { status: 400 })
        }
        else {
            return NextResponse.json({
                status: 200,
                message: "Successfull",
                result: brandExist
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

export async function DELETE(req: NextRequest, next: any) {

    try {
        await connect();
        const id = next.params.id;

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
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}

export async function PUT(req: NextRequest, next: any) {
    try {
        await connect();
        const id = next.params.id;

        const { name, slug, img } = await req.json();
        const updateBrandData = { name, slug, img };
       
        const updateeBrand = await Brand.findByIdAndUpdate(id,updateBrandData);

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
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}