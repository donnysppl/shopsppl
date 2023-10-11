"use client";
import BannerForm from '@/components/form-compo/BannerForm'
import React from 'react'

export default function EditBanner({ params }: { params: { id: string } }) {
    const formFunctData = {
        method: 'PUT',
        id: params.id
    }
    return (
        <>
            <div className='inner-pages-base-div'>
                <div className="head">
                    <h2 className='font-medium'>
                        Edit Banner
                    </h2>
                </div>

                <div className="form-part">
                    <BannerForm {...formFunctData} />
                </div>
            </div>
        </>
    )
}
