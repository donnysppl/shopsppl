import { connect } from '@/dbConfig/dbConfig';
import Product from '@/models/product';
import ExcelJS from 'exceljs';

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connect();
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Products");

        worksheet.columns = [
            { header: "Product_ID", key: "_id" },
            { header: "Product_Name", key: "name" },
            { header: "Product_Slug", key: "slug" },
            { header: "Product_Brand", key: "brand" },
            { header: "Product_Meta_Title", key: "metatitle" },
            { header: "Product_Meta_Discription", key: "metadiscrip" },
            { header: "Product_Meta_Keyword", key: "metakeyword" },
            { header: "Product_Model", key: "model" },
            { header: "Product_Category", key: "category" },
            { header: "Product_Discription", key: "discription" },
            { header: "Product_Main_Img", key: "mainproductimg" },
            { header: "Product_Images", key: "productimg" },
            { header: "Product_RPD_Images", key: "productrpd" },
            { header: "Product_Regular_Price", key: "productNormalPrice" },
            { header: "Product_Sale_Price", key: "productSalePrice" },
            { header: "Product_weight", key: "weight" },
            { header: "Product_lenght", key: "lenght" },
            { header: "Product_width", key: "width" },
            { header: "Product_height", key: "height" },
            { header: "Publish", key: "isPublish" },
            { header: "Status", key: "isStatus" },
            { header: "Featured", key: "isFeatured" },
        ];

        const productData = await Product.find();

        const customPoductData = [];
        for (let i = 0; i < productData.length; i++) {
            const categString = productData[i].category.toString();
            customPoductData.push({
                _id: productData[i]._id,
                name: productData[i].name,
                slug: productData[i].slug,
                brand: productData[i].brand,
                metatitle: productData[i].metatitle,
                metadiscrip: productData[i].metadiscrip,
                metakeyword: productData[i].metakeyword,
                model: productData[i].model,
                category: categString,
                discription: productData[i].discription,
                mainproductimg: productData[i].mainproductimg,
                productimg: productData[i].productimg,
                productrpd: productData[i].productrpd,
                productNormalPrice: productData[i].productNormalPrice,
                productSalePrice: productData[i].productSalePrice,
                weight: productData[i].weight,
                lenght: productData[i].lenght,
                width: productData[i].width,
                height: productData[i].height,
                isPublish: productData[i].isPublish,
                isStatus: productData[i].isStatus,
                isFeatured: productData[i].isFeatured,
            })
        }

        customPoductData.forEach((item) => {
            worksheet.addRow(item);
        });

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true }
        });

        const buffer = await workbook.xlsx.writeBuffer();

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename=products.xlsx'
            }
        });

    } catch (error: any) {
        console.log(error.message)
    }

}