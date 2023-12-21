import CustomProdForm from '@/components/form-compo/CustomProdForm'
import React from 'react'

const formPageFunctData = {
    method: 'POST'
}

export default function CustProdPageAdd() {
    return (
        <div className='inner-pages-base-div form-page'>
            <div className="head">
                <h2 className='font-medium'>
                    Custom Product Page Add
                </h2>
            </div>

            <div>
                <CustomProdForm  {...formPageFunctData} />
            </div>
        </div>
    )
}
