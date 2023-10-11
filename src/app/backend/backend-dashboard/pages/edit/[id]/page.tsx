"use client";
import PagesFrom from '@/components/form-compo/PagesFrom'
import React from 'react'

export default function EditPageBackend({ params }: { params: { id: string } }) {

    const formPageFunctData = {
        method: 'PUT',
        id:params.id
      }

  return (
    <div className='inner-pages-base-div'>
            <div className="head">
                <h2 className='font-medium'>
                    Edit Pages
                </h2>
            </div>

            <div>
            <PagesFrom {...formPageFunctData} />

            </div>
        </div>
  )
}
