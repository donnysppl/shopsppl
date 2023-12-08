import {Schema, model, models}  from "mongoose";

const cateSliderSchema = new Schema({
    category: {
        type: String,
        required: [true, "Please provide a category"],
    },
    categorySlider:[
        {
            slide: { type: String },
            buylink:{type: String,},
            file:{type: String,},
            resfile:{type: String,}
        }
    ]
},{ timestamps: true })

const CateSlider = models.CateSlider || model("CateSlider", cateSliderSchema);

export default CateSlider;