import Product from '@/models/product';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

// {
//     "name":"product name",
//     "slug":"product name",
//     "metatitle":"product name",
//     "metadiscrip":"product name",
//     "metakeyword":"product name",
//     "category":"product name",
//     "categoryslug":"product name",
//     "parentcategory":"product name",
//     "model":"product name",
//     "shortdiscrip":"product name",
//     "discription":"product name",
//     "mainproductimg":"product name",
//     "productimg":["product name","product name"],
//     "productrpd":["product name","product name"],
//     "productNormalPrice":9999,
//     "productSalePrice":6999,
//     "productPriceDiffAmt":3000,
//     "productPriceDiffpercent": 30,
//     "isPublish":true,
//     "isStatus":true,
//     "isFeatured":true
// }

// {name, slug, metatitle, metadiscrip, metakeyword, category, categoryslug, parentcategory, model, shortdiscrip, discription, mainproductimg, productimg, productrpd, productNormalPrice, productSalePrice, productPriceDiffAmt, productPriceDiffpercent, isPublish, isStatus, isFeatured}

export async function POST( req:NextRequest ) {
    try {
        await connect();
        const {name, slug, metatitle, metadiscrip, metakeyword, category, categoryslug, parentcategory, model, shortdiscrip, discription, mainproductimg, productimg, productrpd, productNormalPrice, productSalePrice, productPriceDiffAmt, productPriceDiffpercent, isPublish, isStatus, isFeatured} = await req.json();

        const prodData = {name, slug, metatitle, metadiscrip, metakeyword, category, categoryslug, parentcategory, model, shortdiscrip, discription, mainproductimg, productimg, productrpd, productNormalPrice, productSalePrice, productPriceDiffAmt, productPriceDiffpercent, isPublish, isStatus, isFeatured};

        const productExist = await Product.findOne({ slug })
        if (productExist) {
            return NextResponse.json({
                status: 400,
                message: 'Product already exists',
            }, { status: 400 })
        }
        else{

            const newProduct = new Product(prodData);
            const saveProduct = await newProduct.save();

            return NextResponse.json({
                status: 200,
                message: 'Product created Successfully',
                success: true,
                result: saveProduct,
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

// product?id=64b52e0ec1c322b44520f07c 
export async function DELETE(req: NextRequest) {
    try {
        await connect();
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        const deleteProduct = await Product.findByIdAndDelete(id);

        if (deleteProduct) {
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
            message: error,
        }, { status: 500 })
    }
}

// product?id=64b52e0ec1c322b44520f07c 
export async function PUT(req: NextRequest) {
    try {
        await connect();
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        const {name, slug, metatitle, metadiscrip, metakeyword, category, categoryslug, parentcategory, model, shortdiscrip, discription, mainproductimg, productimg, productrpd, productNormalPrice, productSalePrice, productPriceDiffAmt, productPriceDiffpercent, isPublish, isStatus, isFeatured} = await req.json();
        const updateProductData = {name, slug, metatitle, metadiscrip, metakeyword, category, categoryslug, parentcategory, model, shortdiscrip, discription, mainproductimg, productimg, productrpd, productNormalPrice, productSalePrice, productPriceDiffAmt, productPriceDiffpercent, isPublish, isStatus, isFeatured};

        const updateProduct = await Product.findByIdAndUpdate(id,updateProductData);
       
        if (updateProduct) {
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
            message: error,
        }, { status: 500 })
    }
}
