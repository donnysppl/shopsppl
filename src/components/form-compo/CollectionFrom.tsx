"use client";
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import slugify from 'slugify';
import Loader from '../Loader';

interface FormProps {
    method: string;
    id?: string;
}

export default function CollectionFrom({ method, id }: FormProps) {
    const [collectInp, setcollectInp] = useState({
        name: '',
        slug: '',
        metatitle: '',
        metadis: '',
        metakeyword: '',
        condition: '',
        conditiomfilter: '',
    })
    const [loader, setloader] = useState(false);

    const onConditionHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloader(true);

        const URL = id ? `/api/product/collection/${id}` : '/api/product/collection/'

        await fetch(URL, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(collectInp),
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
                setloader(false);
            })
            .catch(err => {
                console.log(err);
            })

    }


    return (

        <form onSubmit={onConditionHandle} className="relative items-center">
             {
                loader ? <Loader /> : null
            }
            <div className="mb-4 form-inp">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" name='name' className="form-ctrl" placeholder='Name' required
                    onChange={(e) => setcollectInp({ ...collectInp, name: e.target.value, slug: slugify(e.target.value,{ lower: true }) })}
                    value={'' || collectInp.name}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="slug" className="form-label">slug</label>
                <input type="text" name='slug' className="form-ctrl" placeholder='slug' required
                    onChange={(e) => {
                        setcollectInp({ ...collectInp, slug: e.target.value })
                    }}
                    value={'' || collectInp.slug}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="metatitle" className="form-label">metatitle</label>
                <input type="text" name='metatitle' className="form-ctrl" placeholder='metatitle' required
                    onChange={(e) => setcollectInp({ ...collectInp, metatitle: e.target.value })}
                    value={'' || collectInp.metatitle}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="metadis" className="form-label">metadis</label>
                <input type="text" name='metadis' className="form-ctrl" placeholder='metadis' required
                    onChange={(e) => setcollectInp({ ...collectInp, metadis: e.target.value })}
                    value={'' || collectInp.metadis}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="metakeyword" className="form-label">metakeyword</label>
                <input type="text" name='metakeyword' className="form-ctrl" placeholder='metakeyword' required
                    onChange={(e) => setcollectInp({ ...collectInp, metakeyword: e.target.value })}
                    value={'' || collectInp.metakeyword}
                />
            </div>
            <div className="grid grid-cols-2 gap-3" >
                <div className="mb-4 form-inp">
                    <label htmlFor="condition" className="form-label">condition</label>
                    <select name='condition' className="form-ctrl" required value={'' || collectInp.condition}
                        onChange={(e) => setcollectInp({ ...collectInp, condition: e.target.value })} >
                        <option selected>Select Condition by</option>
                        <option value="category">category</option>
                        <option value="brand">brand</option>
                        <option value="price">price</option>
                        <option value="size">size</option>
                    </select>
                </div>
                <div className="mb-4 form-inp">
                    <label htmlFor="conditiomfilter" className="form-label">conditiomfilter</label>
                    <input type="text" name='conditiomfilter' className="form-ctrl" placeholder='conditiomfilter' required
                        onChange={(e) => setcollectInp({ ...collectInp, conditiomfilter: e.target.value })}
                        value={'' || collectInp.conditiomfilter}
                    />
                </div>
            </div>

            <button type='submit' className='dashboard-btn'>Submit</button>

        </form>
    )
}
