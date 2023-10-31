import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Coupon from '@/models/coupon';
import CustomerAdmin from "@/models/customerUser";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const {name,email,productprice} = await req.json();
        console.log({name,email,productprice})

        const couponDataExist = await Coupon.findOne({name:name});
        const customerExist = await CustomerAdmin.findOne({email});
        if(customerExist){
            const couponExist = customerExist.couponlist.includes(name);
            if(couponExist){
                return NextResponse.json({
                    status: 400,
                    message: 'Coupon already used',
                }, { status: 400 })
            }
        }
        else{

            let afterCouponPrice = 0;
            let discountAmmount = 0;

            if (couponDataExist.min_price <= productprice && couponDataExist.max_price >= productprice) {
                if (couponDataExist.condition === 'price') {
                    afterCouponPrice = productprice - couponDataExist.discount;
                    discountAmmount = couponDataExist.discount;
                }
                else if (couponDataExist.condition === 'percentage') {
                    const discAmt = (productprice * couponDataExist.discount) / 100;
                    afterCouponPrice = productprice - discAmt;
                    discountAmmount = discAmt;
                }
                
                return NextResponse.json({
                    status: 200,
                    message: 'Coupon Verify',result:{discountAmmount, afterCouponPrice}
                }, { status: 200 })
            }
            else{
                return NextResponse.json({
                    status: 400,
                    message: 'Coupon Not Vaid',
                }, { status: 400 })
            }

        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}