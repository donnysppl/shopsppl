import CouponForm from '@/components/form-compo/CouponForm'
import React from 'react'

export default function CouponAdd() {
  const formCoupFunctData = {
    method: 'POST'
  }

  return (
    <div className='inner-pages-base-div'>
      <div className="head">
        <h2 className='font-medium'>
          Add Coupon
        </h2>
      </div>

      <div className="form-part mt-4">

        <CouponForm {...formCoupFunctData} />

      </div>
    </div>
  )
}
