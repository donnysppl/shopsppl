import {Schema, model, models}  from "mongoose";

const CustomerOTPVerificationSchema = new Schema({
    customerID: {
        type: String,
    },
    otp: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    expiredAt: {
        type: Date,
    },
},{ timestamps: true })

const CustomerOTPVerification = models.CustomerOTPVerification || model("CustomerOTPVerification", CustomerOTPVerificationSchema);

export default CustomerOTPVerification;