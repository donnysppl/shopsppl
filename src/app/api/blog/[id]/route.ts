import { cookies } from 'next/headers';
import { adminToken } from "@/helpers/fetchToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import BlogsModal from '@/models/blog';

export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
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

        const data = await BlogsModal.findById(params.id);
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

export async function DELETE(req: NextRequest,{ params }: { params: { id: string } }) {
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

        const data = await BlogsModal.findByIdAndDelete(params.id);
        if(!data){
            return NextResponse.json({
                status: 400,
                message: 'Blog not deleted',
            }, { status: 400 })
        }
        else{
            return NextResponse.json({
                status: 200,
                message: 'Blog Deleted', result:data
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

export async function PUT(req: NextRequest,{ params }: { params: { id: string } })  {
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

        const updateBlog = {title,slug,blogdata,metatitle, metadiscription,metakeyword,img};

        const blogExist = await BlogsModal.findByIdAndUpdate(params.id,updateBlog);
        if(!blogExist){
            return NextResponse.json({
                status: 400,
                message: 'Blog Not Updated',
            }, { status: 400 })
        }
        else{
            return NextResponse.json({
                status: 200,
                message: 'Blog Updated',
                result: blogExist
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