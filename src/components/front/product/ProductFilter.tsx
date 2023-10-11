import Link from 'next/link'
import React from 'react'


const Categories = [
    { name: 'all', slug: 'all', href: '#' },
    { name: 'Air Conditioners', slug: 'air-conditioners', href: '#' },
    { name: 'Cooler', slug: 'cooler', href: '#' },
    { name: 'Televisions', slug: 'televisions', href: '#' },
    { name: 'Washing Machines', slug: 'washing-machines', href: '#' },
  ]
  
  const Brand = [
    { slug: 'kodaktv', name: 'Kodak TV' },
    { slug: 'blaupunkt', name: 'Blaupunkt' },
    { slug: 'thomson', name: 'Thomson' },
    { slug: 'westinghouse', name: 'Westinghouse' },
    { slug: 'white-westinghouse', name: 'White Westinghouse' },
  ]

//   <Link href={`?${new URLSearchParams({
//     page: fetchProds.result.next.page, limit: searchParams.limit
//   })}`}>Next</Link>

interface pageType{
    page:string,
    brand:string,
    limit:string,
    category:string,
}

export default function ProductFilter({page,brand,limit,category}:pageType) {
    const limitParam = limit ? limit : '10';
    const brandParam = brand ? brand : 'all';
    const categoryParam = category ? category : 'all';
  return (
    <div className="border-b border-gray-200 py-6">
            <div className="flex flex-col">
              <h4 className="font-bold">Brand</h4>
              {Brand.map((item:any, index:number) => (
                <Link key={index} href={`?${new URLSearchParams({
                    page:page,limit:limitParam,
                   brand: item.name, category: categoryParam
                })}`}>{item.name}</Link>
              ))}
            </div>

            <div className="flex flex-col mt-5">
              <h4 className="font-bold">Categories</h4>
              {Categories.map((item:any, index:number) => (
                <Link key={index} href={`?${new URLSearchParams({
                    page:page,limit:limitParam,
                    brand: brandParam, category: item.name
                })}`}>{item.name}</Link>
              ))}
            </div>
          </div>
  )
}
