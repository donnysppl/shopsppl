import { connect } from "@/dbConfig/dbConfig";
import Admin from '@/models/adminUser';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

export async function POST(req : NextRequest) {

    const { username, email, password, adminRole } = await req.json();
    try {
        await connect();
        // check the user 
        const userExist = await Admin.findOne({ email });
        if (userExist) {
            return NextResponse.json({
                status: 400,
                message: 'Admin already exists',
            }, { status: 400 })
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await await bcryptjs.hash(password, salt);

        // add user
        const newUser = new Admin({ username, email, password : hashedPassword, adminRole })
        const saveUser = await newUser.save();

        return NextResponse.json({
            status: 200,
            message: 'Admin created Successfully',
            success: true,
            result: saveUser,
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}