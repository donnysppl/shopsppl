import { cookies } from 'next/headers';
import { adminToken } from "@/helpers/fetchToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import BlogsModal from '@/models/blog';

export async function POST(req: NextRequest) {
    try {
        await connect();

        // check admin token
        const cookie = cookies()
        const adminTokenExist = adminToken(cookie);

        if (!adminTokenExist) {
            return NextResponse.json({
                status: 400,
                message: 'Unauthorized',
            }, { status: 400 })
        }

        const {title,slug,blogdata,metatitle, metadiscription,metakeyword,img} = await req.json();

        const blogExist = await BlogsModal.findOne({slug});
        if(blogExist){
            return NextResponse.json({
                status: 400,
                message: 'Blog Already Exist',
            }, { status: 400 })
        }
        else{
            const newBlog = new BlogsModal({title,slug,blogdata,metatitle, metadiscription,metakeyword,img})
            const saveBlog = await newBlog.save();

            return NextResponse.json({
                status: 200,
                message: 'Blog Added Successfully',
                result: saveBlog
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

export async function GET(req: NextRequest) {
    try {
        await connect();

        // check admin token
        const cookie = cookies()
        const adminTokenExist = adminToken(cookie);

        if (!adminTokenExist) {
            return NextResponse.json({
                status: 400,
                message: 'Unauthorized',
            }, { status: 400 })
        }

        const data = await BlogsModal.find();
        if(!data){
            return NextResponse.json({
                status: 400,
                message: 'data not found',
            }, { status: 400 })
        }
        else{
            return NextResponse.json({
                status: 200,
                message: 'Blog found', result:data
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