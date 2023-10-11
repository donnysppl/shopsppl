"use client";
import BrandForm from '@/components/form-compo/BrandForm';
import React from 'react'

type ParamsType = {
    id: string,
}

export default function BannerEdit({ params }: { params : ParamsType }) {

    const formFunctData = {
        method: 'PUT',
        id: params.id
    }

    return (
        <div className='inner-pages-base-div'>
            <div className="head">
                <h2 className='font-medium'>
                    Edit Brand
                </h2>
            </div>

            <div className="form-part">
                <BrandForm {...formFunctData} />
            </div>
        </div>
    )
}
