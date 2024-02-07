import { BlogInpProps, Product } from '@/helpers/interFace';
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const url = "https://shopsppl.in";

    // Product
    const productData = await fetch(`${url}/api/product/products`, {
        method: 'GET',
        cache: 'no-cache'
    })
    const ProductRes = await productData.json();

    const ProductEnt: MetadataRoute.Sitemap = ProductRes.result.map((item: Product) => {
        return {
            url: `${url}/product/${item.slug}`,
            lastModified: new Date(),
        }
    })

    // Blog
    const blogData = await fetch(`${url}/api/blog`, {
        method: 'GET',
        cache: 'no-cache'
    })
    const blogRes = await blogData.json();

    const BlogEnt: MetadataRoute.Sitemap = blogRes.result.map((item:any) => {
        return {
            url: `${url}/blog/${item.slug}`,
            lastModified: new Date(),
        }
    })


    // terms/pages
    const termData = await fetch(`${url}/api/terms-policy`, {
        method: 'GET',
        cache: 'no-cache'
    })
    const termRes = await termData.json();

    const TermEnt: MetadataRoute.Sitemap = termRes.result.map((item:any) => {
        return {
            url: `${url}/policy/${item.slug}`,
            lastModified: new Date(),
        }
    })

    return [
        {
            url: `${url}`,
            lastModified: new Date(),
        },
        {
            url: `${url}/about`,
            lastModified: new Date(),
        },
        {
            url: `${url}/contact`,
            lastModified: new Date(),
        },
        {
            url: `${url}/blog`,
            lastModified: new Date(),
        },
        ...ProductEnt,
        ...BlogEnt,
        ...TermEnt,

    ]
}
