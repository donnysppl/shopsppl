import Category from '@/models/category';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

// category/${id}
export async function GET(res: NextRequest, next:any) {
    try {
        await connect();
        const id = next.params.id;
        const data = await Category.findById(id);
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

export async function DELETE(req: NextRequest, next:any) {

    try {
        await connect();
        const id = next.params.id;

        const deleteCategory = await Category.findByIdAndDelete(id);

        if (deleteCategory) {
            return NextResponse.json({
                status: 200,
                message: 'Category Deleted',
            }, { status: 200 })
        }
        else {
            return NextResponse.json({
                status: 400,
                message: 'Category Not Deleted',
            }, { status: 400 })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message:  'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}

export async function PUT(req: NextRequest, next:any) {
    try {
        await connect();
        const id = next.params.id;

        const {name, slug, img, isChild, parentCategorys} = await req.json();
        const updateCategoryData = {name, slug, img, isChild, parentCategorys};

        const updateCategory = await Category.findByIdAndUpdate(id,updateCategoryData);
       
        if (updateCategory) {
            return NextResponse.json({
                status: 200,
                message: 'Category Updated',
            }, { status: 200 })
        }
        else {
            return NextResponse.json({
                status: 400,
                message: 'Category Not Updated',
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