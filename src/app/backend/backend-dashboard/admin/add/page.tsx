import AdminForm from '@/components/form-compo/AdminForm'
import React from 'react'
const formFunctData = {
  method: 'POST',
}
export default function AddAdmin() {
  return (
    <div className='inner-pages-base-div form-page'>
      <div className="head">
        <h2 className='font-medium'>
          Add Admin
        </h2>
      </div>

      <div className="form-part">
        <AdminForm {...formFunctData} />
      </div>
    </div>
  )
}
