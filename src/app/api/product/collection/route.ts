import CollectionProd from '@/models/collectionprod';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        await connect();
        const {
            name,
            slug,
            metatitle,
            metadis,
            metakeyword,
            condition,
            conditiomfilter,
        } = await req.json();

        if (!name || !slug || !metatitle || !metadis || !metakeyword || !condition || !conditiomfilter) {
            return NextResponse.json({
                status: 400,
                message: "Fill The Data Properly",
            }, { status: 400 })
        }
        else {
            const collDataExist = await CollectionProd.findOne({slug:slug});
            if(collDataExist){
                return NextResponse.json({
                    status: 400,
                    message: "Data already exist",
                }, { status: 400 })
            }
            new CollectionProd({
                name,
                slug,
                metatitle,
                metadis,
                metakeyword,
                condition,
                conditiomfilter,
            }).save();
            return NextResponse.json({
                status: 200,
                message: "Successfull",
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