import { connect } from '@/dbConfig/dbConfig';
import Product from '../models/product';
import Blog from '../models/blog';
import Pages from '../models/pages';

export default async function sitemap() {
  const url = 'https://shopsppl.in';

  await connect();

  // product
  const prodData = await Product.find().select('name slug');

  const ProductEnt = prodData.map((item) => {
    return {
      url: `${url}/product/${item.slug}`,
      lastModified: new Date(),
    }
  })


  // Blog
  const blogData = await Blog.find().select('name slug');

  const BlogEnt = blogData.map((item) => {
    return {
      url: `${url}/blog/${item.slug}`,
      lastModified: new Date(),
    }
  })


  // terms/pages
  const bagesData = await Pages.find().select('name slug');

  const TermEnt = bagesData.map((item) => {
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
    ...TermEnt

  ]
}