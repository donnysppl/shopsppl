import ProductListLayout from '@/components/layout/ProductListLayout'
import React from 'react'

export default function Demo({ searchParams }: {
  searchParams: {
    page: string, limit: string, brand: string, category: string
  }
}) {
  const pageParams = parseInt(searchParams.page);
  const limitParams = parseInt(searchParams.limit);
  const brandParams = searchParams.brand;
  const categoryParams = searchParams.category;

  return (
    <>
    <ProductListLayout page={pageParams}
    limit={limitParams} brand={brandParams} category={categoryParams}  />
    </>
  )
}
