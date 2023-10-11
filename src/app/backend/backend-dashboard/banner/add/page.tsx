"use client";
import React from 'react'
import BannerForm from '@/components/form-compo/BannerForm'

export default function AddBanner() {
  const formFunctData = {
    method: 'POST',
}
  return (
    <>
      <div className='inner-pages-base-div'>
        <div className="head">
          <h2 className='font-medium'>
            Add Banner
          </h2>
        </div>

        <div className="form-part">
          <BannerForm {...formFunctData} />
        </div>
      </div>
    </>
  )
}
