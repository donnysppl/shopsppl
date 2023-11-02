import BlogsForm from '@/components/form-compo/BlogsForm'
import React from 'react'

export default function BlogAddBK() {
  const formFunctData = {
    method: 'POST',
  }
  return (
    <div className='inner-pages-base-div'>
      <div className="head">
        <h2 className='font-medium'>
          Add Blog
        </h2>
      </div>

      <div className="form-part">
        <BlogsForm {...formFunctData} />
      </div>
    </div>
  )
}
