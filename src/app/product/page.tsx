import LimitSelect from '@/components/front/product/LimitSelect';
import ProductFilter from '@/components/front/product/ProductFilter';
import ProductListLayout from '@/components/layout/ProductListLayout';
import { Metadata } from 'next'

interface fetchProd {
  result: {
    result: any[];
    next: {
      page: number;
      limit: number;
    };
    prev: {
      page: number;
      limit: number;
    };
    totalPosts: number;
    totalPages: number;
  }
}



//  Static metadata
export const metadata: Metadata = {
  title: 'Product | Shop',
  description: 'Product | Shop',
  alternates: {
      canonical: `/product`
  }
}

export default async function ProductList({ searchParams }: {
  searchParams: {
    page: string, limit: string, brand: string, category: string, price: string, size:string
  }
}) {
  const pageParams = parseInt(searchParams.page ? searchParams.page : '1') ;
  const limitParams = parseInt(searchParams.limit);
  const brandParams = searchParams.brand;
  const categoryParams = searchParams.category;
  const priceParams = searchParams.price;
  const sizeParams = searchParams.size;

  return (
    <div className="bg-[#FBFBFB]">
      <div className="product-filter-main ">
        <div className="product-filter-part ">
          <ProductFilter brand={brandParams} category={categoryParams} page={searchParams.page} limit={searchParams.limit} price={priceParams} size={sizeParams} />
        </div>
        <div className="product-part">
          <div className="px-4">
            <div className='flex justify-between py-4'>
              <h2 className='font-medium'>Product List</h2>
              <div>
                <LimitSelect brand={brandParams} category={categoryParams} page={pageParams} />
              </div>
            </div>
            <ProductListLayout />


          </div>

        </div>
      </div>
    </div>
  )
}
