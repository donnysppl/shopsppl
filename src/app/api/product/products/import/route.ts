import { NextRequest, NextResponse } from "next/server";
import XLSX from "xlsx";
import { writeFile } from 'fs/promises'
import fs from "fs";
import Product from "@/models/product";
import { connect } from "@/dbConfig/dbConfig";
import { ImportSheetArr } from "@/helpers/interFace";

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

        if (dataupdate) {
            const bulkOperations = jsonData.map((record) => {
                const simplifiedString = record.Product_ID.replace(/"/g, '');
                
                const filter = { _id: simplifiedString }; 
                const update = {
                    $set: {
                        name: record.Product_Name,
                        slug: record.Product_Slug,
                        metatitle: record.Product_Meta_Title,
                        metadiscrip: record.Product_Meta_Discription,
                        metakeyword: record.Product_Meta_Keyword,
                        model: record.Product_Model,
                        category: record.Product_Category,
                        discription: record.Product_Discription,
                        mainproductimg: record.Product_Main_Img,
                        productimg: record.Product_Images,
                        productrpd: record.Product_RPD_Images,
                        productNormalPrice: record.Product_Regular_Price,
                        productSalePrice: record.Product_Sale_Price,
                        isPublish: record.Publish,
                        isStatus: record.Status,
                        isFeatured: record.Featured,
                    },
                };

                return {
                    updateOne: {
                        filter,
                        update,
                    },
                };
            });

            try {
                const bulkWriteResult = await Product.bulkWrite(bulkOperations);
                console.log(bulkWriteResult)
                return NextResponse.json({ success: true,bulkWriteResult, message: `documents updated.` })
            } catch (error) {
                console.error('Error during bulkWrite operation:', error);
                return NextResponse.json({ success: false, error: 'Error during bulkWrite operation.' })
            }
        }
        else {
            for (let i = 0; i < jsonData.length; i++) {
                sheetData.push({
                    name: jsonData[i].Product_Name,
                    slug: jsonData[i].Product_Slug,
                    metatitle: jsonData[i].Product_Meta_Title,
                    metadiscrip: jsonData[i].Product_Meta_Discription,
                    metakeyword: jsonData[i].Product_Meta_Keyword,
                    model: jsonData[i].Product_Model,
                    category: jsonData[i].Product_Category,
                    discription: jsonData[i].Product_Discription,
                    mainproductimg: jsonData[i].Product_Main_Img,
                    productimg: jsonData[i].Product_Images,
                    productrpd: jsonData[i].Product_RPD_Images,
                    productNormalPrice: jsonData[i].Product_Regular_Price,
                    productSalePrice: jsonData[i].Product_Sale_Price,
                    isPublish: jsonData[i].Publish,
                    isStatus: jsonData[i].Status,
                    isFeatured: jsonData[i].Featured,
                })

            }
            const inserManyData = await Product.insertMany(sheetData)
            return NextResponse.json({ success: true, inserManyData })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: error,
        }, { status: 500 })
    }

}