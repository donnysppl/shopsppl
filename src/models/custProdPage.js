import {Schema, model, models}  from "mongoose";

const custProdPageSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    slug: {
        type: String,
        required: [true, "Please provide a slug"],
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
    productIDs: {
        type: Array,
    }
},{ timestamps: true })

const CustProdPage = models.CustProdPage || model("CustProdPage", custProdPageSchema);

export default CustProdPage;