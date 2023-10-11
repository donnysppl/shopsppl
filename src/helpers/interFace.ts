export interface Product {
    _id: string;
    brand: string;
    brandArr: any[];
    category: string;
    categoryArr: Array<{
        childCategorys: any[];
        img: string;
        isParent: boolean;
        name: string;
        slug: string;
    }>;
    discription: string;
    isFeatured: boolean;
    isPublish: boolean;
    isStatus: boolean;
    mainproductimg: string;
    metadiscrip: string;
    metakeyword: string;
    metatitle: string;
    model: string;
    name: string;
    productNormalPrice: number;
    productSalePrice: number;
    productimg: Array<{}>;
    productrpd: Array<{
        order: string;
        imglink: string;
    }>;
    shortdiscrip: string;
    slug: string;
    productPriceDiffpercent: number,
    productPriceDiffAmt: number

}

export type ImportSheetArr = ImportSheetObj[]

export interface ImportSheetObj {
    Product_ID: string
    Product_Name: string
    Product_Slug: string
    Product_Meta_Title: string
    Product_Meta_Discription: string
    Product_Meta_Keyword: string
    Product_Model: string
    Product_Category: string
    Product_Discription: string
    Product_Main_Img: string
    Product_Images: string
    Product_RPD_Images: string
    Product_Regular_Price: number
    Product_Sale_Price: number
    Publish: boolean
    Status: boolean
    Featured: boolean
    Product_Brand: string
    Product_weight: number
    Product_lenght: number
    Product_width: number
    Product_height: number
}