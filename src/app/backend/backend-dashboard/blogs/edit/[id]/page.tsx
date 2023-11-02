import BlogsForm from '@/components/form-compo/BlogsForm'
import React from 'react'

export default function BlogEditBk({ params }: { params: { id: string } }) {
  const formFunctData = {
    method: 'PUT',
    id:params.id,
  }
  return (
    <div className='inner-pages-base-div'>
      <div className="head">
        <h2 className='font-medium'>
          Edit Blog
        </h2>
      </div>

      <div className="form-part">
        <BlogsForm {...formFunctData} />
      </div>
    </div>
  )
}
