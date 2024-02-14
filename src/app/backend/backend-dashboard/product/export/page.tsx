"use client";
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import JsFileDownloader from 'js-file-downloader';


export default function ProductExport() {

    const [file, setfile] = useState<File | null>(null)
    const [update, setupdate] = useState(false);
    const [loader, setloader] = useState<boolean>(false)

    const [ekartpinImp, setekartpinImp] = useState<File | null>(null);

    const onExportProd = async () => {
        setloader(true);
        const fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/products/export`;

        new JsFileDownloader({
            url: fileUrl
        }).then(function () {
            toast.success('Downloaded')
            setloader(false);
        })
            .catch(function (error: any) {
                toast.error(error.message)
                setloader(false);
            });

    }

    const onProdSheetUpoad = async (e: React.FormEvent<HTMLFormElement>) => {
        setloader(true);
        e.preventDefault();
        console.log(file, update)

        const formData = new FormData();
        formData.append("file", file as File);
        formData.append("update", String(update));

        await fetch('/api/product/products/import/new', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setloader(false);
                    toast.success(res.message);
                }
                else {
                    setloader(false);
                    toast.success(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onProdSheetUpoadUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        setloader(true);
        e.preventDefault();
        console.log(loader)

        const formData = new FormData();
        formData.append("file", file as File);

        await fetch('/api/product/products/import/', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setloader(false);
                    toast.success(res.message);
                }
                else {
                    setloader(false);
                    toast.success(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    const onEkartPinImpoUpoad = async (e: React.FormEvent<HTMLFormElement>) => {
        setloader(true);
        e.preventDefault();
        console.log(ekartpinImp)

        const formData = new FormData();
        formData.append("file", ekartpinImp as File);

        await fetch('/api/ekart/available/importpin', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setloader(false);
                    toast.success(res.message);
                }
                else {
                    setloader(false);
                    toast.success(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className='inner-pages-base-div form-page-list'>
            <div className="head">
                <h2 className='font-semibold'>
                    Product Export and Import
                </h2>
            </div>

            {
                loader ? 'Loading ... ' :
                    <>
                        <div className='mt-5 border-b border-gray-200 pb-5'>
                            <h4 className='mb-2 font-semibold'>Export</h4>
                            <div className="">
                                <button onClick={onExportProd} className='dashboard-btn'>Export All Data</button>
                                <button className='ms-4 dashboard-btn'>Download Sample Sheet</button>
                            </div>
                        </div>

                        <div className='mt-2.5 grid grid-cols-2 gap-4 border-b border-gray-200 pb-5'>
                            <div>
                                <h4 className='mb-2 font-semibold'>Import New Product</h4>
                                <form className='' onSubmit={onProdSheetUpoad} encType="multipart/form-data" >
                                    <input type="file" name="file" className="form-ctrl mb-3"
                                        onChange={(e) => setfile(e.target.files?.[0] as File)} />
                                    <button type='submit' className='dashboard-btn'>Upload</button>

                                </form>
                            </div>
                            <div>
                                <h4 className='mb-2 font-semibold'>Update Product</h4>
                                <form className='' onSubmit={onProdSheetUpoadUpdate} encType="multipart/form-data" >
                                    <input type="file" name="file" className="form-ctrl mb-3"
                                        onChange={(e) => setfile(e.target.files?.[0] as File)} />
                                    <button type='submit' className='dashboard-btn'>Upload</button>

                                </form>
                            </div>
                        </div>

                        <div className='mt-2.5 grid grid-cols-2 gap-4'>
                            <div>
                                <h4 className='mb-2 font-semibold'>Import Ekart Availablity</h4>
                                <form className='' onSubmit={onEkartPinImpoUpoad} encType="multipart/form-data" >
                                    <input type="file" name="ekartpinImp" className="form-ctrl mb-3"
                                        onChange={(e) => setekartpinImp(e.target.files?.[0] as File)} />
                                    <button type='submit' className='dashboard-btn'>Upload</button>

                                </form>
                            </div>
                            {/* <div>
                                <h4 className='mb-2'>Update Product</h4>
                                <form className='' onSubmit={onProdSheetUpoadUpdate} encType="multipart/form-data" >
                                    <input type="file" name="file" className="form-ctrl mb-3"
                                        onChange={(e) => setfile(e.target.files?.[0] as File)} />
                                    <button type='submit' className='dashboard-btn'>Upload</button>

                                </form>
                            </div> */}
                        </div>
                    </>
            }




        </div>

    )
}
