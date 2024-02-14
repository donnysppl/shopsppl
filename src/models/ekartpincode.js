import {Schema, model, models}  from "mongoose";

const ekartPincodeSchema = new Schema({
    pincode: {
        type: String,
        required: [true, "Please provide a pincode"],
    },
    hub_state: {
        type: String,
        required: [true, "Please provide a hub_state"],
    },
    hub_city: {
        type: String,
        required: [true, "Please provide a hub_city"],
    },
    status: {
        type: Boolean,
        required: [true, "Please provide a status"],
    },
},{ timestamps: true })

const EkartPincode = models.EkartPincode || model("EkartPincode", ekartPincodeSchema);

export default EkartPincode;