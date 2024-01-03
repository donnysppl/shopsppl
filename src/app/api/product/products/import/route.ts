import { NextRequest, NextResponse } from "next/server";
import * as XLSX from 'xlsx';
import Product from "@/models/product";
import { connect } from "@/dbConfig/dbConfig";
import Category from "@/models/category";
import Brand from "@/models/brand";

export async function POST(req: NextRequest) {

    try {
        await connect();
        const data = await req.formData()
        console.log(data)
        const file: File | null = data.get('file') as unknown as File;
        console.log(file)

        if (!file) {
            return NextResponse.json({ success: false })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const sheetData = [];

        const bulkOperations = await Promise.all(jsonData.map(async (record: any) => {
            const simplifiedString = record.Product_ID.replace(/"/g, '');
            const listCat = record.Product_Category;
            const productimgSplit = record.Product_Images;
            const productRPSSplit = record.Product_RPD_Images;
            const catArr = listCat.split(",");
            const productimgArr = productimgSplit.split(",");
            const productRPDArr = productRPSSplit.split(",");
            const categoryData = await Category.find({ name: { $in: catArr } });
            const brandData = await Brand.find({ name: { $in: record.Product_Brand } });
            const priceDiffData = record.Product_Regular_Price - record.Product_Sale_Price;
            const priceDiffPercentData = (priceDiffData / record.Product_Regular_Price) * 100;

            const filter = { _id: simplifiedString };
            const update = {
                $set: {
                    name: record.Product_Name,
                    slug: record.Product_Slug,
                    metatitle: record.Product_Meta_Title,
                    metadiscrip: record.Product_Meta_Discription,
                    metakeyword: record.Product_Meta_Keyword,
                    model: record.Product_Model,
                    category: catArr,
                    categoryArr: categoryData,
                    discription: record.Product_Discription,
                    mainproductimg: record.Product_Main_Img,
                    productimg: productimgArr,
                    productrpd: productRPDArr,
                    productNormalPrice: record.Product_Regular_Price,
                    productSalePrice: record.Product_Sale_Price,
                    isPublish: record.Publish,
                    isStatus: record.Status,
                    isFeatured: record.Featured,
                    productPriceDiffAmt: priceDiffData,
                    productPriceDiffpercent: priceDiffPercentData,
                    brand: record.Product_Brand,
                    weight: record.Product_weight,
                    lenght: record.Product_lenght,
                    width: record.Product_width,
                    height: record.Product_height,
                    brandArr: brandData,
                },
            };

            return {
                updateOne: {
                    filter,
                    update,
                },
            };
        }));
        try {
            const bulkWriteResult = await Product.bulkWrite(bulkOperations);
            console.log(bulkWriteResult)
            return NextResponse.json({ success: true, bulkWriteResult, message: `Product Updated` })
        } catch (error) {
            console.error('Error during bulkWrite operation:', error);
            return NextResponse.json({ success: false, error: 'Error during bulkWrite operation.' })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: error,
        }, { status: 500 })
    }

}