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
  inStock: boolean
tag:Array<{}>;
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

export interface orderInptype {
  email: string;
  name: string;
  phone: number;
  address: string;
  city: string;
  state: string;
  pincode: number;
  companyname: string;
  totalbill: number;
  ship_add: boolean;
  ship_address: {
    email: string;
    name: string;
    phone: number;
    address: string;
    city: string;
    state: string;
    pincode: number;
    companyname: string;
  };
  orderprod: Array<{
    productname: string;
    productId: string;
    productslug: string;
    productmodel: string;
    productnormalprice: number;
    productsaleprice: number;
    quantity: number;
    coupon: string,
  }>;
  status: string;
  orderid: string;
  sppl_orderid: string;
  paymentid: string;
  paymentdate: string;
  coupon?: string,
  totalprodprice: number,
  discountammount?: number,
  ekartData: Array<{
    trackingID: string;
  }>;
}

export interface BlogInpProps {
  title: string,
  slug: string,
  blogdata: string,
  metatitle: string,
  metadiscription: string,
  metakeyword: string,
  img: string
}
export interface Category {
  img: string,
  isChild: boolean,
  name: string,
  parentCategorys: string,
  _id: string
}
export interface HomeCateSlider {
  category: string,
  _id: string,
  categorySlider: [
    {
      slide: string,
      buylink: string,
      file: string,
      resfile: string,
      _id: string,
    }
  ]

}
export interface CustTokenDecode {
  id: string,
  username: string,
  email: string,
}

export interface AdminTokenDecode {
  id: string,
  username: string,
  email: string,
  adminrole: string,
  iat: number,
  exp: number
}

export const postRoutes = [
  "/backend/backend-dashboard",
  "/backend/backend-dashboard/blogs/add",
  "/backend/backend-dashboard/blogs/list",
  "/backend/backend-dashboard/banner/add",
  "/backend/backend-dashboard/banner/list",
  "/backend/backend-dashboard/brand/add-brand",
  "/backend/backend-dashboard/brand/list-brand",
  "/backend/backend-dashboard/category/add-category",
  "/backend/backend-dashboard/category/list-category",
  "/backend/backend-dashboard/product/add-product",
  "/backend/backend-dashboard/product/list-product",
  "/backend/backend-dashboard/coupon/add",
  "/backend/backend-dashboard/coupon/list",
  "/backend/backend-dashboard/order/order-list",
  "/backend/backend-dashboard/pages/pages-add",
  "/backend/backend-dashboard/pages/pages-list",
  "/backend/backend-dashboard/pages/custom-product/add",
  "/backend/backend-dashboard/pages/custom-product/list",
];

export const serviceRoutes = [
  "/backend/backend-dashboard",
  "/backend/backend-dashboard/contact/list",
];

export const superAdminRoutes = [
  ...serviceRoutes, ...postRoutes,
  "/backend/backend-dashboard/admin/add",
  "/backend/backend-dashboard/admin/list",
];