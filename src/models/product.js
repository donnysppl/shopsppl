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
        type: Array,
    },
    brand: {
        type: String,
    },
    brandArr: {
        type: Array,
    },
    categoryArr: {
        type: Array,
    },
    model: {
        type: String,
        required: [true, "Please provide a Product model"],
    },
    shortdiscrip: {
        type: String,
    },
    discription: {
        type: String,
    },
    mainproductimg: {
        type: String,
        required: [true, "Please provide a Product main image"],
    },
    productimg: {
        type: Array,
    },
    productrpd: {
        type: Array,
    },
    productNormalPrice:{
        type: Number,
        required: [true, "Please provide a Product Regular Price"],
    },
    productSalePrice:{
        type: Number,
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
    },
    weight : {
        type: Number,
    },
    lenght : {
        type: Number,
    },
    width : {
        type: Number,
    },
    height : {
        type: Number,
    },
    inStock:{
        type: Boolean, 
    },
    stock:{
        type:Number,
    }
},{ timestamps: true })

const Product = models.Product || model("Product", productSchema);

export default Product;