import ProductForm from '@/components/form-compo/ProductForm'
import React from 'react'

const formprofFunctData = {
  method: 'POST'
}

export default function AddProduct() {
  return (
    <div className='inner-pages-base-div form-page'>
      <div className="head">
        <h2 className='font-medium'>
          Add Product
        </h2>
      </div>

      <div className="form-part mt-4">
        

        <ProductForm {...formprofFunctData}/>

      </div>

    </div>
  )
}
