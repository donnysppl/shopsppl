"use client";

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';

interface AllCategory {
    name: string;
    _id: string;
}

interface CateFormProps {
    method: string,
    id?: string,
}

export default function CategoryForm({ method, id }: CateFormProps) {

    const [cateState, setcateState] = useState({
        name: '',
        slug: '',
        img: '',
        isChild: '',
        parentCategorys: ''
    });
    const [prevCatData, setprevCatData] = useState([])
    const [childCatVal, setchildCatVal] = useState<boolean>(false);
    const [parentCatdata, setparentCatdata] = useState([]);

    const [allCate, setallCate] = useState<AllCategory[]>([]);
    const [loader, setloader] = useState(true);

    useEffect(() => {
        const fetchEditCateData = async () => {
            setloader(true);
            await fetch(`/api/product/category/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        setcateState(res.result);
                        setchildCatVal(res.result.isChild)
                        toast.success(res.message);
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

        if (id) {
            fetchEditCateData();
        }

    }, [id])

    useEffect(() => {
        const fetchCateData = async () => {
            setloader(true);
            await fetch('/api/product/category', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                        setallCate(res.result);
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
        fetchCateData();
    }, [])


    const categoryURL = id ? `/api/product/category/${id}` : '/api/product/category'

    const onCategorySubmit = async (e: any) => {
        e.preventDefault();
        setloader(true);

        const data = {
            name: cateState.name,
            slug: cateState.slug,
            img: cateState.img,
            isChild: childCatVal,
            parentCategorys: cateState.parentCategorys
        }

        await fetch(categoryURL, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
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
        <form onSubmit={onCategorySubmit} className='relative'>

            {
                loader ? <Loader /> : null
            }

            <div className="mb-4 form-inp">
                <label htmlFor="name" className="form-label">Category Name</label>
                <input type="text" name='name' className="form-ctrl" placeholder='Category Name'
                    onChange={(e) => setcateState({ ...cateState, name: e.target.value })}
                    value={'' || cateState.name}
                />
            </div>

            <div className="mb-4 form-inp">
                <label htmlFor="slug" className="form-label">Category Slug</label>
                <input type="text" name='slug' className="form-ctrl" placeholder='Category Slug'
                    onChange={(e) => setcateState({ ...cateState, slug: e.target.value })}
                    value={'' || cateState.slug}
                />
            </div>

            <div className="mb-4 form-inp">
                <label htmlFor="img" className="form-label">Category Image Link</label>
                <input type="text" name='img' className="form-ctrl" placeholder='Category Image Link'
                    onChange={(e) => setcateState({ ...cateState, img: e.target.value })}
                    value={'' || cateState.img}
                />
            </div>

            <div className="mb-3 form-check ">
                <input type="checkbox" className="form-ctrl checkbox cursor-pointer" id="isParent" name="isParent"
                    onChange={(e) => setchildCatVal(!childCatVal)}
                    checked={childCatVal} />
                <label className="form-label cursor-pointer" htmlFor="isParent">IS Child Category</label>
            </div>

            {
                childCatVal ?
                    <div className="mb-4 form-inp">
                        <label htmlFor="img" className="form-label">Choose Parent Category</label>
                        <select className="form-ctrl" defaultValue={'DEFAULT'} value={'' || cateState.parentCategorys} onChange={(e) => setcateState({ ...cateState, parentCategorys: e.target.value })}>
                            <option value="DEFAULT" disabled>Choose a category...</option>
                            {
                                allCate && allCate.map((item, index) => (
                                    <option key={index} value={item._id}>{item.name}</option>
                                ))
                            }

                        </select>
                    </div>
                    : null
            }

            <button type='submit' className='dashboard-btn'>Submit</button>

        </form>
    )
}
