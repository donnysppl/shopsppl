import {Schema, model, models}  from "mongoose";

const bannerSchema = new Schema({
    name: {
        type: String,
    },
    bannerimg: {
        type: String,
    },
    bannermobimg: {
        type: String,
    },
    order:{
        type: String,
    },
    link:{
        type: String,
    }
},{ timestamps: true })

const Banner = models.Banner || model("Banner", bannerSchema);

export default Banner;