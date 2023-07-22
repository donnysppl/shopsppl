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
        required: [true, "Please provide a Category Image Link"],
    },
    isParent:{
        type: Boolean,
        require: [true, "Please provide a Category is Parent Category or not"],
    },
    childCategorys:{
        type:Array
    }
})

const Category = models.Category || model("Category", categorySchema);

export default Category;