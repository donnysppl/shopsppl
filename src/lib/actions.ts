// import { connect } from "@/dbConfig/dbConfig"
// import Product from "@/models/product";

// export async function featureProd() {
//     try {
//         await connect();
//         const featProd = await Product.find({isFeatured:true}).limit(2).select('-discription -productimg -productrpd');
//         // const strifyData = await JSON.stringify(featProd);
//         return featProd
//     } catch (error) {
//         console.log(error)
//     }
// }