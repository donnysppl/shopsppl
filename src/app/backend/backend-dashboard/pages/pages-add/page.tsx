"use client";
import PagesFrom from '@/components/form-compo/PagesFrom'
import React from 'react'

export default function ADDPagesBackend() {

    const formPageFunctData = {
        method: 'POST'
      }
    

  return (
    <div className='inner-pages-base-div form-page'>
            <div className="head">
                <h2 className='font-medium'>
                    Add Pages
                </h2>
            </div>

            <div>
            <PagesFrom  {...formPageFunctData}/>

            </div>
        </div>
  )
}
