"use server";

import { connect } from "@/dbConfig/dbConfig";
import Banner from "@/models/banner";
import Product from "@/models/product";
import { revalidatePath } from "next/cache";

export const fetchNewLaunchProd = async (tag:string) => {
    try {
        await connect();
        const findNewLaunch = await Product.find({tag:tag}).select('name slug mainproductimg productSalePrice productNormalPrice category tag brand model').exec();
        // console.log(findNewLaunch)
        revalidatePath('/');
        return findNewLaunch;
    } catch (error) {
        
    }
}

export const fetchBanner = async (tag:string) => {
    try {
        await connect();
        const bannerData = await Banner.find();
        // console.log(findNewLaunch)
        revalidatePath('/');
        return bannerData;
    } catch (error) {
        
    }
}