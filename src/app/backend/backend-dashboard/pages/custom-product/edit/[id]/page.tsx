import CustomProdForm from '@/components/form-compo/CustomProdForm'
import React from 'react'

export default function CustProdPageEdit({ params }: { params: { id: string } }) {
    const formPageFunctData = {
        method: 'PUT',
        id:params.id
    }
    return (
        <div className='inner-pages-base-div form-page'>
            <div className="head">
                <h2 className='font-medium'>
                    Custom Product Page Edit
                </h2>
            </div>

            <div>
                <CustomProdForm  {...formPageFunctData} />
            </div>
        </div>
    )
}