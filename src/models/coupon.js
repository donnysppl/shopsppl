import {Schema, model, models}  from "mongoose";

const CouponSchema = new Schema({
    name:{
        type:String,
        unique: true,
    },
    min_price:{
        type:Number,
    },
    max_price:{
        type:Number,
    },
    condition:{
        type:String,
    },
    discount:{
        type:Number,
    },
    multiuse:{
        type:Boolean,
    }
},{ timestamps: true })

const Coupon = models.Coupon || model("Coupon", CouponSchema);

export default Coupon;