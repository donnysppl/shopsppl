import {Schema, model, models}  from "mongoose";

const blogsSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },
    slug: {
        type: String,
        required: [true, "Please provide a slug"],
    },
    blogdata: {
        type: String,
        required: [true, "Please provide a pagedata"],
    },
    metatitle: {
        type: String,
        required: [true, "Please provide a metatitle"],
    },
    metadiscription: {
        type: String,
        required: [true, "Please provide a metadiscription"],
    },
    metakeyword: {
        type: String,
        required: [true, "Please provide a metakeyword"],
    },
    img: {
        type: String,
        // required: [true, "Please provide a img"],
    },
},{ timestamps: true })

const BlogsModal = models.BlogsModal || model("BlogsModal", blogsSchema);

export default BlogsModal;