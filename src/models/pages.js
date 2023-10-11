import {Schema, model, models}  from "mongoose";

const pagesSchema = new Schema({
    pagename: {
        type: String,
        required: [true, "Please provide a pagename"],
    },
    slug: {
        type: String,
        required: [true, "Please provide a slug"],
    },
    pagedata: {
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
},{ timestamps: true })

const PagesModal = models.PagesModal || model("PagesModal", pagesSchema);

export default PagesModal;