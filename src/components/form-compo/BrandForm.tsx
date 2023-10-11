"use client";
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';

type BrandFormProps = {
    method: string,
    id?: string,
}

export default function BrandForm({ method, id }: BrandFormProps) {

    const [brandState, setbrandState] = useState({
        name: '',
        slug: '',
        img: ''
    })

    useEffect(() => {
        const oldBrandFetch = async () => {
            await fetch(`/api/product/brand/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                        setbrandState(res.result);
                    }
                    else if (res.status === 400) {
                        toast.error(res.message);
                    }
                    else if (res.status === 500) {
                        toast.error(res.message);
                    }
                })
                .catch(err => {
                    console.log(err);

                })
        }
        if (id) {
            oldBrandFetch();
        }
    }, [id])

    const brandURL = id ? `/api/product/brand/${id}` : '/api/product/brand'

    const onBrandDataSubmit = async (e: any) => {
        e.preventDefault();

        await fetch(brandURL, {
            method: method,
            body: JSON.stringify(brandState),
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    toast.success(res.message);
                    window.location.reload();
                }
                else if (res.status === 400) {
                    toast.error(res.message);
                }
                else if (res.status === 500) {
                    toast.error(res.message);
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
