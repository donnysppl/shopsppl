import {Schema, model, models}  from "mongoose";

const customerSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    phone:{
        type: String,
        required: [true, "Please provide a Phone Number"],
    },
    password:{
        type: String,
    },
    isWhatsappNo:{
        type: Boolean,
        default: false,
    },
    isCustomerAdmin:{
        type: Boolean,
        default: false,
    },
    isVarified:{
        type: Boolean,
        default: false,
    },
    cart:{
        type: Array,
    },
    orderlist:{
        type:Array,
    }
},{ timestamps: true })

const CustomerAdmin = models.CustomerAdmin || model("CustomerAdmin", customerSchema);

export default CustomerAdmin;