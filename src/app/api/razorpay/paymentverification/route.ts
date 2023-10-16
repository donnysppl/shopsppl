// import { instance } from "@/helpers/RazorInt";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto"
import ProductOrder from "@/models/orderProduct";


export async function POST(req: NextRequest) {
    const { razorpay_payment_id,razorpay_order_id,razorpay_signature,userid} = await req.json();
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY!)
        .update(body.toString())
        .digest('hex');

    const isValid = expectedSignature === razorpay_signature;
   
const update = await ProductOrder.findByIdAndUpdate(userid,{
    paymentid: razorpay_payment_id, orderid: razorpay_order_id, status: 'payment completed', paymentdate: new Date() 
})
console.log(update)
    if(!isValid){
        return NextResponse.json({
            status: 400,
            message: 'Payment not varified', razorpay_payment_id
        }, { status: 400 })
    }

    return NextResponse.json({
        status: 200,
        message: 'Payment varified', razorpay_payment_id
    }, { status: 200 })
}