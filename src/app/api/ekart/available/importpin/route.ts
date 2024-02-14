import { NextRequest, NextResponse } from "next/server";
import * as XLSX from 'xlsx';
import EkartPincode from '@/models/ekartpincode';
import { connect } from "@/dbConfig/dbConfig";

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
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any;
        const sheetData = [];

        for (let i = 0; i < jsonData.length; i++) {

            sheetData.push({
                pincode:jsonData[i].PINCODE,
                hub_state:jsonData[i].HUB_STATE,
                hub_city:jsonData[i].HUB_CITY,
                status:jsonData[i].STATUS,
            })

        }
        const inserManyData = await EkartPincode.insertMany(sheetData)
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