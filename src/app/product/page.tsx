import LimitSelect from '@/components/front/product/LimitSelect';
import ProductFilter from '@/components/front/product/ProductFilter';
import ProductListLayout from '@/components/layout/ProductListLayout';

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

export async function generateMetadata() {
  return {
    title: 'Product | Shop',
    description: 'Product',
    alternates: {
      canonical: `/product`
    }
  }
}

export default async function ProductList({ searchParams }: {
  searchParams: {
    page: string, limit: string, brand: string, category: string
  }
}) {
  const pageParams = parseInt(searchParams.page ? searchParams.page : '1') ;
  const limitParams = parseInt(searchParams.limit);
  const brandParams = searchParams.brand;
  const categoryParams = searchParams.category;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="product-filter-main grid grid-cols-1 gap-x-8 md:gap-y-10 gap-y-2 lg:grid-cols-4">
        <div className="product-filter-part">
          <ProductFilter brand={brandParams} category={categoryParams} page={searchParams.page} limit={searchParams.limit} />
        </div>
        <div className="product-part lg:col-span-3">
          <div className="mx-auto max-w-screen-xl">
            <div className='flex justify-between p-4'>
              <h2>product List</h2>
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
