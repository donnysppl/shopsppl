import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Coupon from '@/models/coupon';
import CustomerAdmin from "@/models/customerUser";

interface CoupInpProps {
    name: string,
    min_price: number,
    max_price: number,
    condition: string,
    discount: number,
    multiuse: boolean,
}

async function verifyCouponPrice(couponDataExist: CoupInpProps, productprice: number) {
    let afterCouponPrice = 0;
    let discountAmount = 0;

    const priceCond = couponDataExist.min_price <= productprice && couponDataExist.max_price >= productprice;

    if (!priceCond) {
        return NextResponse.json({
            status: 400,
            message: 'Coupon Not Valid',
        }, { status: 400 })
    } else {
        if (couponDataExist.condition === 'price') {
            afterCouponPrice = productprice - couponDataExist.discount;
            discountAmount = couponDataExist.discount;
        } else if (couponDataExist.condition === 'percentage') {
            const discAmt = (productprice * couponDataExist.discount) / 100;
            afterCouponPrice = productprice - discAmt;
            discountAmount = discAmt;
        }

        return NextResponse.json({
            status: 200,
            message: 'Coupon Verified',
            result: { discountAmount, afterCouponPrice }
        }, { status: 200 })
    }
}

export async function POST(req: NextRequest) {
    try {
        await connect();
        const { name, email, productprice } = await req.json();

        const couponDataExist = await Coupon.findOne({ name });
        const customerExist = await CustomerAdmin.findOne({ email });

        if (!couponDataExist) {
            return NextResponse.json({
                status: 400,
                message: 'Coupon Not Valid',
            }, { status: 400 });
        } else {
            const couponMultiUse = couponDataExist.multiuse;

            if (!couponMultiUse) {
                if (!customerExist) {
                    return await verifyCouponPrice(couponDataExist, productprice);
                } else {
                    const couponExist = customerExist.couponlist.includes(name);
                    if (couponExist) {
                        return {
                            status: 400,
                            message: 'Coupon already used',
                        };
                    } else {
                        return await verifyCouponPrice(couponDataExist, productprice);
                    }
                }
            } else {
                return await verifyCouponPrice(couponDataExist, productprice);
            }
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Something went wrong: ' + error,
        }, { status: 500 });
    }
}
