import {Schema, model, models}  from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a Category Name"],
    },
    slug: {
        type: String,
        required: [true, "Please provide a Category Slug"],
        unique: true,
    },
    img: {
        type: String,
    },
    isChild:{
        type: Boolean,
    },
    parentCategorys:{
        type: String
    }
},{ timestamps: true })

const Category = models.Category || model("Category", categorySchema);

export default Category;