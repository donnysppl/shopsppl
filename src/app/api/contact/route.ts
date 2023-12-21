import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Contact from '@/models/contact';

export async function POST(req: NextRequest) {
    try {
        await connect();
        const { name, email, phone, message, type } = await req.json();
        console.log({ name, email, phone, message, type })

        const newData = new Contact({ name, email, phone, message, type });
        const saveData = await newData.save();

        return NextResponse.json({
            status: 200,
            message: 'Data Submit', result: saveData
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        await connect();
        const data = await Contact.find();

        console.log(data)
        if (!data) {
            return NextResponse.json({
                status: 400,
                message: 'Data not found'
            }, { status: 400 })
        }

        return NextResponse.json({
            status: 200,
            message: 'Data Founded', result:data
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}
