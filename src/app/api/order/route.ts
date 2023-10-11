import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import ProductOrder from "@/models/orderProduct";
import CustomerAdmin from "@/models/customerUser";

interface CustomerAdminType{
    _id:string,username: string, email: string, password: string, phone: string, isWhatsappNo: boolean,
    cart:any, orderlist:any
}

export async function POST(req: NextRequest) {
    try {
        await connect();
        const { email, name, phone, address, city, state, pincode, orderprod,totalbill} = await req.json();
        const oldOrderData = await ProductOrder.count();
        const newOrderData = new ProductOrder({ email, name, phone, address, city, state, pincode, orderprod,totalbill,status:'payment_pending',orderid:`SPPLW${oldOrderData + 1}`});
        const customerExist:CustomerAdminType | null = await CustomerAdmin.findOne({email});
        if(customerExist){
            await CustomerAdmin.updateOne({ _id: customerExist._id }, {
                $push: {orderlist: newOrderData._id}
            })
            const saveNewOrderData = await newOrderData.save();
            return NextResponse.json({
                status: 200,
                message: 'Order Added Successfully', result:saveNewOrderData,
            }, { status: 200 })
        }
        else{
            const newCustomer = new CustomerAdmin({ email, username:name, phone,orderlist:newOrderData._id})
            await newCustomer.save();
            const saveNewOrderData = await newOrderData.save();
            return NextResponse.json({
                status: 200,
                message: 'Order Added Successfully', result:saveNewOrderData,
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

        const orderData = await ProductOrder.find();
        if(!orderData){
            return NextResponse.json({
                status: 400,
                message: 'Data Not Found',
            }, { status: 400 })
        }
        else{
            return NextResponse.json({
                status: 200,
                message: 'Data Found', result:orderData,
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