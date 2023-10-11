import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import Loader from '../Loader'

interface BannerInp {
    name: string,
    order: string,
    link: string,
    bannerimg: string,
    bannermobimg: string,
}
type BannerFormProps = {
    method: string,
    id?: string,
}
export default function BannerForm({ method, id }: BannerFormProps) {

    const [bannerInp, setbannerInp] = useState<BannerInp>({
        name: '',
        order: '',
        link: '',
        bannerimg: '',
        bannermobimg: '',
    })
    const [loader, setloader] = useState<boolean>(false)

    useEffect(() => {
        const bannerPrevData = async () => {
            setloader(true)
            await fetch(`/api/banner/list/${id}`, {
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                    }
                    else if (res.status === 500) {
                        toast.error(res.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            setloader(false)
        }
        if (id) {
            bannerPrevData();
        }

    }, [id])


    const onBannerdDataSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setloader(true);

        const url = (method === 'POST') ? '/api/banner/add' : `/api/banner/edit/${id}`
        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bannerInp),
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
        setloader(false)
    }
    return (
        <>
            {
                loader ? <div className='relative w-full min-h-[500px]'><Loader /></div> :

                    <form className={`p-3 `} onSubmit={onBannerdDataSubmit}  >
                        <div className="mb-4 form-inp">
                            <label htmlFor="name" className="form-label">Banner Name</label>
                            <input type="text" name='name' className="form-ctrl" placeholder='Banner Name'
                                onChange={(e) => setbannerInp({ ...bannerInp, name: e.target.value })}
                                value={'' || bannerInp.name}
                            />
                        </div>
                        <div className="mb-4 form-inp">
                            <label htmlFor="order" className="form-label">Banner order</label>
                            <input type="text" name='order' className="form-ctrl" placeholder='Banner Slug'
                                onChange={(e) => setbannerInp({ ...bannerInp, order: e.target.value })}
                                value={'' || bannerInp.order}
                            />
                        </div>
                        <div className="mb-4 form-inp">
                            <label htmlFor="link" className="form-label">Banner Link</label>
                            <input type="text" name='link' className="form-ctrl" placeholder='Banner Link'
                                onChange={(e) => setbannerInp({ ...bannerInp, link: e.target.value })}
                                value={'' || bannerInp.link}
                            />
                        </div>
                        <div className="mb-4 form-inp">
                            <label htmlFor="bannerimg" className="form-label">Banner bannerimg</label>
                            <input type="text" name='bannerimg' className="form-ctrl" placeholder='Banner bannerimg'
                                onChange={(e) => setbannerInp({ ...bannerInp, bannerimg: e.target.value })}
                                value={'' || bannerInp.bannerimg}
                            />
                        </div>
                        <div className="mb-4 form-inp">
                            <label htmlFor="bannermobimg" className="form-label">Banner bannermobimg</label>
                            <input type="text" name='bannermobimg' className="form-ctrl" placeholder='Banner bannermobimg'
                                onChange={(e) => setbannerInp({ ...bannerInp, bannermobimg: e.target.value })}
                                value={'' || bannerInp.bannermobimg}
                            />
                        </div>

                        <div className="banner-image-prev">
                            {
                                (bannerInp.bannerimg && bannerInp.bannermobimg) ?
                                    <>
                                        <div className="flex gap-2">
                                            <div className="banner-img-preview">
                                                <Image width={200} height={200} src={bannerInp.bannerimg} alt="bannerimg" />
                                            </div>
                                            <div className="banner-img-preview">
                                                <Image width={200} height={200} src={bannerInp.bannermobimg} alt="bannermobimg" />
                                            </div>
                                        </div>
                                    </> : null
                            }
                        </div>
                        <button type='submit' className='dashboard-btn'>Submit</button>
                    </form>
            }
        </>
    )
}
