import { instance } from "@/helpers/RazorInt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    const {amount} = await req.json();

    const options = {
        amount: Number(amount * 100),  // amount in the smallest currency unit
        currency: "INR",
      };
     const creatOrder = await instance.orders.create(options);
     console.log(creatOrder)
     return NextResponse.json({
        status: 200,
        message: 'razorpay order created ', result: creatOrder
    }, { status: 200 })
}