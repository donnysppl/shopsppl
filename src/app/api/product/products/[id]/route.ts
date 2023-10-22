import Product from '@/models/product';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Category from '@/models/category';
import Brand from '@/models/brand';

export async function GET(res: NextRequest, { params }: { params: { id: string }}) {
    try {
        await connect();
        const id = params.id;
        const data = await Product.findById(id);
        if (!data) {
            return NextResponse.json({
                status: 400,
                message: "Product Not Found",
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {
    try {
        await connect();
        const id = params.id;

        const deleteCategory = await Product.findByIdAndDelete(id);

        if (deleteCategory) {
            return NextResponse.json({
                status: 200,
                message: 'Product Deleted',
            }, { status: 200 })
        }
        else {
            return NextResponse.json({
                status: 400,
                message: 'Product Not Deleted',
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

export async function PUT(req: NextRequest, { params }: { params: { id: string }}) {
    try {
        await connect();
        const id = params.id;

        const { name, slug, metatitle, metadiscrip, metakeyword, category, model, shortdiscrip, discription, mainproductimg, productimg, productrpd, productNormalPrice, productSalePrice, isPublish, isStatus, isFeatured, productPriceDiffAmt, productPriceDiffpercent, brand, weight
            , lenght
            , width,inStock,stock
            , height } = await req.json();

        const categoryData = await Category.find({ name: { $in: category } });
        const brandData = await Brand.find({ name: { $in: brand } });

        console.log(typeof(productimg),typeof(productrpd))

        const productimgStr = productimg.toString();
        const productRPDStr = productimg.toString();

        const productimgArr = productimgStr.split(",");
        const productRPDArr = productRPDStr.split(",");

        console.log(productimgArr, productRPDArr)

        const updateProdData = await {
            name, slug, metatitle, metadiscrip, metakeyword, category, model, shortdiscrip, discription, mainproductimg, productimg:productimgArr, productrpd:productRPDArr, productNormalPrice, productSalePrice, isPublish, isStatus, isFeatured, categoryArr: categoryData, productPriceDiffAmt, productPriceDiffpercent, brand, weight, brandArr: brandData
            , lenght,inStock,stock
            , width
            , height
        };

        const updateCategory = await Product.findByIdAndUpdate(id,updateProdData);
       
        if (updateCategory) {
            return NextResponse.json({
                status: 200,
                message: 'Product Updated',
            }, { status: 200 })
        }
        else {
            return NextResponse.json({
                status: 400,
                message: 'Product Not Updated',
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