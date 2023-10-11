import { NextRequest, NextResponse } from "next/server";
import XLSX from "xlsx";
import { writeFile } from 'fs/promises'
import fs from "fs";
import Product from "@/models/product";
import { connect } from "@/dbConfig/dbConfig";
import { ImportSheetArr } from "@/helpers/interFace";
import Category from "@/models/category";
import Brand from "@/models/brand";

export async function POST(req: NextRequest) {

    try {
        await connect();
        const data = await req.formData()
        console.log(data)
        const file: File | null = data.get('file') as unknown as File;
        const dataupdateValue = data.get('update');
        const dataupdate = (dataupdateValue === 'true');
        console.log(dataupdate)
        console.log(file)

        if (!file) {
            return NextResponse.json({ success: false })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const path = `public/uploads/temp/${file.name}`
        const pathFolder = 'public/uploads/temp'
        if (!fs.existsSync(pathFolder)) {
            fs.mkdirSync(pathFolder, { recursive: true });
            console.log('folder created');
        }
        await writeFile(path, buffer)
        console.log(`open ${path} to see the uploaded file`)
        let wrokbook = XLSX.readFile(path)
        let worksheet = wrokbook.Sheets[wrokbook.SheetNames[0]]
        const jsonData: ImportSheetArr = XLSX.utils.sheet_to_json(worksheet);

        const sheetData = [];

        for (let i = 0; i < jsonData.length; i++) {
            const listCat = jsonData[i].Product_Category;
            const productimgSplit = jsonData[i].Product_Images;
            const productRPSSplit = jsonData[i].Product_RPD_Images;
            const catArr = listCat.split(",");
            const productimgArr = productimgSplit.split(",");
            const productRPDArr = productRPSSplit.split(",");
            const categoryData = await Category.find({ name: { $in: catArr } });
            const brandData = await Brand.find({name : {$in : jsonData[i].Product_Brand }});
            const priceDiffData = jsonData[i].Product_Regular_Price - jsonData[i].Product_Sale_Price;
            const priceDiffPercentData = (priceDiffData / jsonData[i].Product_Regular_Price) * 100;

            sheetData.push({
                name: jsonData[i].Product_Name,
                slug: jsonData[i].Product_Slug,
                metatitle: jsonData[i].Product_Meta_Title,
                metadiscrip: jsonData[i].Product_Meta_Discription,
                metakeyword: jsonData[i].Product_Meta_Keyword,
                model: jsonData[i].Product_Model,
                category: catArr,
                categoryArr: categoryData,
                discription: jsonData[i].Product_Discription,
                mainproductimg: jsonData[i].Product_Main_Img,
                productimg: productimgArr,
                productrpd: productRPDArr,
                productNormalPrice: jsonData[i].Product_Regular_Price,
                productSalePrice: jsonData[i].Product_Sale_Price,
                isPublish: jsonData[i].Publish,
                isStatus: jsonData[i].Status,
                isFeatured: jsonData[i].Featured,
                productPriceDiffAmt:priceDiffData,
                productPriceDiffpercent:priceDiffPercentData,
                brand: jsonData[i].Product_Brand,
                weight: jsonData[i].Product_weight,
                lenght: jsonData[i].Product_lenght,
                width: jsonData[i].Product_width,
                height: jsonData[i].Product_height,
                brandArr : brandData,
            })

        }
        const inserManyData = await Product.insertMany(sheetData)
        if (inserManyData) {
            return NextResponse.json({ status: 200, success: true, message: "Success", inserManyData }, 
            { status: 200 })
        }
        else {
            return NextResponse.json({ status: 400, success: false, message: "Somthing Went Wrong" }, { status: 400 })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: error,
        }, { status: 500 })
    }

}