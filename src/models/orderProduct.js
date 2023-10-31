import {Schema, model, models}  from "mongoose";

const orderProdSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide a email"],
    },
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    phone:{
        type: Number,
        required: [true, "Please provide a Phone Number"],
    },
    address:{
        type: String,
    },
    city:{
        type: String,
    },
    state:{
        type: String,
    },
    pincode:{
        type: Number,
    },
    orderprod:{
        type:Array,
    },
    totalbill:{
        type: Number,
    },
    shipmenttracking:{
        type: String,
    },
    status:{
        type: String,
    },
    orderid:{
        type: String,
    },
    paymentid:{
        type: String,
    },
    orderid: {
        type: String,
    },
     paymentdate: {
        type: String,
    },
    ship_add:{
        type: Boolean,
    },
    ship_address:{
        type: Object,
    },
    sppl_orderid:{
        type: String,
    },
    customerid:{
        type: String,
    },
    coupon:{
        type: String,
    },
    totalprodprice:{
        type: Number,
    },
    discountammount:{
        type: Number,
    },
},{ timestamps: true })

const ProductOrder = models.ProductOrder || model("ProductOrder", orderProdSchema);

export default ProductOrder;