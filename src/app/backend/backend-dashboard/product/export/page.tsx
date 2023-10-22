"use client";
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import JsFileDownloader from 'js-file-downloader';


export default function ProductExport() {

    const [file, setfile] = useState<File | null>(null)
    const [update, setupdate] = useState(false);
    const [loader, setloader] = useState<boolean>(false)

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
    return (
        <div className='inner-pages-base-div'>
            <div className="head">
                <h2 className='font-semibold'>
                    Product Export and Import
                </h2>
            </div>

            {
                loader ? 'Loading ... ' :
                    <>
                        <div className='mt-5 '>
                            <h4 className='mb-2'>Export</h4>
                            <div className="p-4">
                                <button onClick={onExportProd} className='dashboard-btn'>Export All Data</button>
                                <button className='ms-4 dashboard-btn'>Download Sample Sheet</button>
                            </div>
                        </div>

                        <div className='mt-5 grid grid-cols-2 gap-4'>
                            <div>
                                <h4 className='mb-2'>Import New Product</h4>
                                <form className='' onSubmit={onProdSheetUpoad} encType="multipart/form-data" >
                                    <input type="file" name="file" className="form-ctrl mb-3"
                                        onChange={(e) => setfile(e.target.files?.[0] as File)} />
                                    <button type='submit' className='dashboard-btn'>Upload</button>

                                </form>
                            </div>
                            <div>
                                <h4 className='mb-2'>Update Product</h4>
                                <form className='' onSubmit={onProdSheetUpoad} encType="multipart/form-data" >
                                    <input type="file" name="file" className="form-ctrl mb-3"
                                        onChange={(e) => setfile(e.target.files?.[0] as File)} />
                                    <button type='submit' className='dashboard-btn'>Upload</button>

                                </form>
                            </div>
                        </div>
                    </>
            }




        </div>

    )
}
