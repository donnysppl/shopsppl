"use client";
import React, { useState } from 'react'

type BrandFormProps = {
    method: string
}

export default function BrandForm({ method }: BrandFormProps) {

    const [brandState, setbrandState] = useState({
        name: '',
        slug: '',
        img: ''
    })

    const onBrandDataSubmit = async (e: any) => {
        e.preventDefault();

        await fetch('/api/product/brand', {
            method: method,
            body: JSON.stringify(brandState),
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {

                }
                else if (res.status === 400) {

                }
            })
            .catch(err => {
                console.log(err);

            })
    }
    return (
        <form className='p-3' onSubmit={onBrandDataSubmit}>
            <div className="mb-4 form-inp">
                <label htmlFor="name" className="form-label">Brand Name</label>
                <input type="text" name='name' className="form-ctrl" placeholder='Brand Name'
                    onChange={(e) => setbrandState({ ...brandState, name: e.target.value })}
                    value={'' || brandState.name}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="slug" className="form-label">Brand Slug</label>
                <input type="text" name='slug' className="form-ctrl" placeholder='Brand Slug'
                    onChange={(e) => setbrandState({ ...brandState, slug: e.target.value })}
                    value={'' || brandState.slug}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="img" className="form-label">Brand Image Link</label>
                <input type="text" name='img' className="form-ctrl" placeholder='Brand Image Link'
                    onChange={(e) => setbrandState({ ...brandState, img: e.target.value })}
                    value={'' || brandState.img}
                />
            </div>
            <button type='submit' className='dashboard-btn'>Submit</button>
        </form>
    )
}
