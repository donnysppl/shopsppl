import CollectionFrom from '@/components/form-compo/CollectionFrom'
import React from 'react'

const fromConstData = {
    method: 'POST'
}


export default function CollectionAdd() {
    return (
        <div className='inner-pages-base-div form-page'>
            <div className="head">
                <h2 className='font-medium'>
                    Add Collection
                </h2>
            </div>

            <div className="form-part mt-4">
                <CollectionFrom {...fromConstData} />


            </div>

        </div>
    )
}
