"use client";
import { BlogInpProps } from '@/helpers/interFace';
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';

import dynamic from 'next/dynamic'
import Loader from '../Loader';

var Editor = dynamic(() => import("@/components/form-compo/Editor"), {
    ssr: false
})

type BlogFormProps = {
    method: string,
    id?: string,
}

export default function BlogsForm({ method, id }: BlogFormProps) {

    const [blogInp, setblogInp] = useState<BlogInpProps>({
        title: '',
        slug: '',
        blogdata: '',
        metatitle: '',
        metadiscription: '',
        metakeyword: '',
        img: ''
    });
    const [loader, setloader] = useState<Boolean>(false)

    useEffect(() => {
        const fetchblogData = async () => {
            setloader(true);
            await fetch(`/api/blog/${id}`, {
                method: 'GET',
                cache: "no-cache",
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        setblogInp(res.result);
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
            fetchblogData();
        }

    }, [id])

    const blogURL = id ? `/api/blog/${id}` : '/api/blog'

    const onBlogSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloader(true);

        await fetch(blogURL,{
            method : method,
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(blogInp),
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
        <form className='p-3 relative' onSubmit={onBlogSubmit} >
            {
                loader ? <Loader /> : null
            }
            <div className="mb-4 form-inp">
                <label htmlFor="title" className="form-label">Blog Title</label>
                <input type="text" name='title' className="form-ctrl" placeholder='Blog Title'
                onChange={(e) => setblogInp({ ...blogInp, title: e.target.value })}
                value={'' || blogInp.title}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="slug" className="form-label">Blog slug</label>
                <input type="text" name='slug' className="form-ctrl" placeholder='Blog slug'
                onChange={(e) => setblogInp({ ...blogInp, slug: e.target.value })}
                value={'' || blogInp.slug}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="metatitle" className="form-label">Blog metatitle</label>
                <input type="text" name='metatitle' className="form-ctrl" placeholder='Blog metatitle'
                onChange={(e) => setblogInp({ ...blogInp, metatitle: e.target.value })}
                value={'' || blogInp.metatitle}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="metakeyword" className="form-label">Blog metakeyword</label>
                <input type="text" name='metakeyword' className="form-ctrl" placeholder='Blog metakeyword'
                onChange={(e) => setblogInp({ ...blogInp, metakeyword: e.target.value })}
                value={'' || blogInp.metakeyword}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="metadiscription" className="form-label">Blog metadiscription</label>
                <input type="text" name='metadiscription' className="form-ctrl" placeholder='Blog metadiscription'
                onChange={(e) => setblogInp({ ...blogInp, metadiscription: e.target.value })}
                value={'' || blogInp.metadiscription}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="img" className="form-label">Blog img</label>
                <input type="text" name='img' className="form-ctrl" placeholder='Blog img'
                onChange={(e) => setblogInp({ ...blogInp, img: e.target.value })}
                value={'' || blogInp.img}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="blogdata" className="form-label">Blog Data</label>
                <div className="ckeditor-bg">
                    <Editor name="Blog Data" value={blogInp.blogdata}
                        onChange={(data: string) => {
                            setblogInp({ ...blogInp, blogdata: data })
                        }} />
                </div>
            </div>

            <button type='submit' className='dashboard-btn'>Submit</button>
        </form>
    )
}
