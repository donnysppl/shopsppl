import { BlogInpProps, Product } from '@/helpers/interFace';
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {


    // Product
    const productData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/products`, {
        method: 'GET',
        cache: 'no-cache'
    })
    const ProductRes = await productData.json();

    const ProductEnt: MetadataRoute.Sitemap = ProductRes.result.map((item: Product) => {
        return {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${item.slug}`,
            lastModified: new Date(),
        }
    })

    // Blog
    const blogData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
        method: 'GET',
        cache: 'no-cache'
    })
    const blogRes = await blogData.json();

    const BlogEnt: MetadataRoute.Sitemap = blogRes.result.map((item:any) => {
        return {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${item.slug}`,
            lastModified: new Date(),
        }
    })


    // terms/pages
    const termData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/terms-policy`, {
        method: 'GET',
        cache: 'no-cache'
    })
    const termRes = await termData.json();

    const TermEnt: MetadataRoute.Sitemap = termRes.result.map((item:any) => {
        return {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/${item.slug}`,
            lastModified: new Date(),
        }
    })

    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
            lastModified: new Date(),
        },
        ...ProductEnt,
        ...BlogEnt,
        ...TermEnt,

    ]
}