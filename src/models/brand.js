import {Schema, model, models}  from "mongoose";

const brandSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a Brand Name"],
    },
    slug: {
        type: String,
        required: [true, "Please provide a Brand Slug"],
        unique: true,
    },
    img: {
        type: String,
    }
},{ timestamps: true })

const Brand = models.Brand || model("Brand", brandSchema);

export default Brand;