import {Schema, model, models}  from "mongoose";

const collectProdSchema = new Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    metatitle: {
        type: String,
    },
    metadis:{
        type: String,
    },
    metakeyword:{
        type: String,
    },
    condition:{
        type: String,
    },
    conditiomfilter:{
        type: String,
    },
},{ timestamps: true })

const CollectionProd = models.CollectionProd || model("CollectionProd", collectProdSchema);

export default CollectionProd;