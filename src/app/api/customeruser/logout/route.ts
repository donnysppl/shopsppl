import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res =  NextResponse.json({
            message: "Logout successful",
            status: 200,
            success: true,
         },{status: 200,})
         res.cookies.delete("customer-token")
         return res;

    } catch (error:any) {
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 });
    }
}