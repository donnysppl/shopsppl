import Category from '@/models/category';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(res:NextRequest) {
    try {
        await connect();
        const {name, slug, img, isChild, parentCategorys} = await res.json();

        const categoryExist = await Category.findOne({ slug })
        if (categoryExist) {
            return NextResponse.json({
                status: 400,
                message: 'Category already exists',
            }, { status: 400 })
        }
        else {

            const newCategory = new Category({name, slug, img, isChild, parentCategorys})
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
            message: 'Somthing went wrong ' + error,
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
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}
