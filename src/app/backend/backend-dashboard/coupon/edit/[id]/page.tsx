
import CouponForm from '@/components/form-compo/CouponForm'
import React from 'react'

type ParamsType = {
  id: string,
}

export default function CouponEdit({ params }: { params : ParamsType }) {
  const formCoupFunctData = {
    method: 'PUT',
    id : params.id
  }

  return (
    <div className='inner-pages-base-div'>
      <div className="head">
        <h2 className='font-medium'>
          Edit Coupon
        </h2>
      </div>

      <div className="form-part mt-4">

        <CouponForm {...formCoupFunctData} />

      </div>
    </div>
  )
}
