"use server";

import { connect } from "@/dbConfig/dbConfig";
import Banner from "@/models/banner";
import Product from "@/models/product";
import Collection from "@/models/collectionprod";
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

export const fetchBanner = async () => {
    try {
        await connect();
        const bannerData = await Banner.find().exec();
        // console.log(findNewLaunch)
        revalidatePath('/');
        return bannerData;
    } catch (error) {
        
    }
}

export const collectionProd = async ({filter}:{
    filter : {category?: string,}
}) => {
    try {
        console.log(filter)
        await connect();
        const findNewLaunch = await Product.find(filter).select('-discription -productimg -productrpd').exec();
        revalidatePath('/');
        return findNewLaunch;
    } catch (error) {
        
    }
}

export const collectionData = async () => {
    try {
        await connect();
        const collectionData = await Collection.find().exec();
        revalidatePath('/');
        return collectionData;
    } catch (error) {
        
    }
}
