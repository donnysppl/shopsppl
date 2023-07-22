import Category from '@/models/category';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(res:NextRequest) {
    try {
        await connect();
        const {name, slug, img, isParent, childCategorys} = await res.json();

        const categoryExist = await Category.findOne({ slug })
        if (categoryExist) {
            return NextResponse.json({
                status: 400,
                message: 'Category already exists',
            }, { status: 400 })
        }
        else {

            const newCategory = new Category({name, slug, img, isParent, childCategorys})
            const saveCategory = await newCategory.save();

            return NextResponse.json({
                status: 200,
                message: 'Category created Successfully',
                success: true,
                result: saveCategory,
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
        const data = await Category.find();
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

// category?id=64b52e0ec1c322b44520f07c 
export async function DELETE(req: NextRequest) {

    try {
        await connect();
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

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
            message: error,
        }, { status: 500 })
    }
}

// category?id=64b52e0ec1c322b44520f07c 
export async function PUT(req: NextRequest) {
    try {
        await connect();
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        const {name, slug, img, isParent, childCategorys} = await req.json();
        const updateCategoryData = {name, slug, img, isParent, childCategorys};

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
            message: error,
        }, { status: 500 })
    }
}