import Category from '@/models/category';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connect();
        const data = await Category.find();

        const parentChild = data.filter(item => item.isChild === false);
        const child = data.filter(item => item.isChild === true);
        const cateDate = [];

        for (let i = 0; i < parentChild.length; i++) {
            const parentData = {
                parentCateName : parentChild[i].name,
                parentCateslug : parentChild[i].slug,
                childCate:[] as any,
            }
            for (let j = 0; j < child.length; j++) {
                if(parentChild[i].id === child[j].parentCategorys){
                    parentData.childCate.push({
                        childCateName : child[j].name,
                        childCateslug : child[j].slug,
                    })
                }
            }
            cateDate.push(parentData);
        }

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
                result:cateDate
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