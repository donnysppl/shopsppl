import {Schema, model, models}  from "mongoose";

const contactSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    message:{
        type: String,
    },
    type:{
        type: String,
    }
},{ timestamps: true })

const Contact = models.Contact || model("Contact", contactSchema);

export default Contact;