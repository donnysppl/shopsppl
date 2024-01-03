import BrandForm from '@/components/form-compo/BrandForm';
import React from 'react'

export default function page() {

    const formFunctData = {
        method : 'POST'
    }

    return (
        <div className='inner-pages-base-div form-page'>
            <div className="head">
                <h2 className='font-medium'>
                    Add Brand
                </h2>
            </div>

            <div className="form-part">
                <BrandForm {...formFunctData} />
            </div>
        </div>
    )
}
