import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import ProductOrder from "@/models/orderProduct";
import Product from "@/models/product";

export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
    try {
        await connect();
        const orderData = await ProductOrder.findOne({_id:params.id});
        const prodData = await Product.findOne({_id : orderData.orderprod[0].productId}).select('-discription -productimg -productrpd -categoryArr -brandArr -metatitle -metadiscrip -metakeyword');

        const orderFullData = {orderData, prodData};
        console.log(orderFullData)


        if (!orderData) {
            return NextResponse.json({
                status: 400,
                message: 'Data Not Found',
            }, { status: 400 })
        }
        else {
            return NextResponse.json({
                status: 200,
                message: 'Data Found', result: orderFullData,
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