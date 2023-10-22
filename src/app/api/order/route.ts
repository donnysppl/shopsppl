import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import ProductOrder from "@/models/orderProduct";
import CustomerAdmin from "@/models/customerUser";
import { orderInptype } from "@/helpers/interFace";

interface CustomerAdminType {
    _id: string, username: string, email: string, password: string, phone: string, isWhatsappNo: boolean,
    cart: any, orderlist: any
}

export async function POST(req: NextRequest) {
    try {
        await connect();
        const { email, name, phone, address, city, state, pincode, orderprod, totalbill,companyname,ship_add,ship_address} = await req.json();
        const oldOrderData = await ProductOrder.count();

        const newData = { email, name, phone, address, city, state, pincode, orderprod, totalbill,companyname,status: 'payment_pending', 
        sppl_orderid: `SPPLW${oldOrderData + 1} `} as orderInptype
        if (ship_add === true) {
            newData.ship_add = ship_add;
            newData.ship_address = ship_address;
        }
        const newOrderData = new ProductOrder(newData);
        const customerExist: CustomerAdminType | null = await CustomerAdmin.findOne({ email });
        if (customerExist) {
            await CustomerAdmin.updateOne({ _id: customerExist._id }, {
                $push: { orderlist: newOrderData._id },
            })
            newOrderData.customerid = customerExist._id;
            const saveNewOrderData = await newOrderData.save();
            return NextResponse.json({
                status: 200,
                message: 'Order Added Successfully', result: saveNewOrderData,
            }, { status: 200 })
        }
        else {
            const newCustomer = new CustomerAdmin({ email, username: name, phone, orderlist: newOrderData._id })
            await newCustomer.save();
            newOrderData.customerid = newCustomer._id;
            const saveNewOrderData = await newOrderData.save();
            return NextResponse.json({
                status: 200,
                message: 'Order Added Successfully', result: saveNewOrderData,
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
        if (!orderData) {
            return NextResponse.json({
                status: 400,
                message: 'Data Not Found',
            }, { status: 400 })
        }
        else {
            return NextResponse.json({
                status: 200,
                message: 'Data Found', result: orderData,
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