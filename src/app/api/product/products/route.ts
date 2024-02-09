import Product from '@/models/product';
import Category from '@/models/category';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Brand from '@/models/brand';


export async function POST(req: NextRequest) {
    try {
        await connect();
        const { name, slug, metatitle, metadiscrip, metakeyword, category, model, shortdiscrip, discription, mainproductimg, productimg, productrpd, productNormalPrice, productSalePrice, isPublish, isStatus, isFeatured, productPriceDiffAmt, productPriceDiffpercent, brand, weight
            , lenght,inStock,stock,tag
            , width
            , height } = await req.json();

        const categoryData = await Category.find({ name: { $in: category } });
        const brandData = await Brand.find({ name: { $in: brand } });

        const productimgStr = productimg.toString();
        const productRPDStr = productimg.toString();
        const productTagStr = tag.toString();

        const productimgArr = productimgStr.split(",");
        const productRPDArr = productRPDStr.split(",");
        const productTagArr = productTagStr.split(",");

        const prodData = await {
            name, slug, metatitle, metadiscrip, metakeyword, category, model, shortdiscrip, discription, mainproductimg, productimg:productimgArr, productrpd:productRPDArr, productNormalPrice, productSalePrice, isPublish, isStatus, isFeatured, categoryArr: categoryData, productPriceDiffAmt, productPriceDiffpercent, brand, weight, brandArr: brandData
            , lenght ,tag:productTagArr
            , width
            , height,inStock,stock
        };

        const productExist = await Product.findOne({ slug })
        // if(categoryArr){
        if (productExist) {
            return NextResponse.json({
                status: 400,
                message: 'Product already exists',
            }, { status: 400 })
        }
        else {

            const newProduct = new Product(prodData);
            const saveProduct = await newProduct.save();
            return NextResponse.json({
                status: 200,
                message: 'Product created Successfully',
                success: true,
                result: saveProduct,
            }, { status: 200 })

        }
        // }


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
        const data = await Product.find();

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