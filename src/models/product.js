import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a Product Name"],
    },
    slug: {
        type: String,
        required: [true, "Please provide a Product Slug"],
        unique: true,
    },
    metatitle: {
        type: String,
        required: [true, "Please provide a Product metatitle"],
    },
    metadiscrip: {
        type: String,
        required: [true, "Please provide a Product metadiscrip"],
    },
    metakeyword: {
        type: String,
        required: [true, "Please provide a Product metakeyword"],
    },
    category: {
        type: String,
        required: [true, "Please provide a Product category"],
    },
    categoryslug: {
        type: String,
        required: [true],
    },
    parentcategory: {
        type: String,
    },
    model: {
        type: String,
        required: [true, "Please provide a Product model"],
    },
    shortdiscrip: {
        type: String,
        required: [true, "Please provide a Product short discription"],
    },
    discription: {
        type: String,
        required: [true, "Please provide a Product discription"],
    },
    mainproductimg: {
        type: String,
        required: [true, "Please provide a Product main image"],
    },
    productimg: {
        type: Array,
        required: [true, "Please provide a Product images"],
    },
    productrpd: {
        type: Array,
        required: [true, "Please provide a Product images"],
    },
    productNormalPrice:{
        type: Number,
        required: [true, "Please provide a Product Regular Price"],
    },
    productSalePrice:{
        type: Number,
        required: [true, "Please provide a Product Sale Price"],
    },
    productPriceDiffAmt:{
        type: Number
    },
    productPriceDiffpercent:{
        type: Number
    },
    isPublish:{
        type: Boolean,
    },
    isStatus:{
        type: Boolean,
    },
    isFeatured:{
        type: Boolean,
    }
})

const Product = models.Product || model("Product", productSchema);

export default Product;