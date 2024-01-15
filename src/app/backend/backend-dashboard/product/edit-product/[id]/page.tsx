import ProductForm from '@/components/form-compo/ProductForm'
import React from 'react'

type ParamsType = {
    id: string,
}

export default function EditProduct({ params }: { params : ParamsType }) {

    const formprofFunctData = {
        method: 'PUT',
        id : params.id,
    }

    return (
        <div className='inner-pages-base-div form-page'>
            <div className="head">
                <h2 className='font-medium'>
                    Edit Product
                </h2>
            </div>

            <div className="form-part mt-4">

                <ProductForm {...formprofFunctData} />

            </div>

        </div>
    )
}
