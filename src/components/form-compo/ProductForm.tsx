"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Loader from "../Loader";
import Select from 'react-select';

interface AllCategory {
    name: string;
    _id: string;
}
interface FormValue {
    order: string;
    imglink: string;
}
interface ProdInp {
    name: string;
    slug: string;
    model: string;
    productNormalPrice: number;
    productSalePrice: number;

    metatitle: string;
    metakeyword: string;
    metadiscrip: string;

    category: string;
    categoryslug: string;
    parentcategory: string;

    shortdiscrip: string;
    discription: string;
    mainproductimg: string;
    productimg: string;
    productrpd: string;
    weight: Number;
    lenght: Number;
    width: Number;
    height: Number;
}
interface ProdFormProps {
    method: string,
    id?: string,
}

export default function ProductForm({ method, id }: ProdFormProps) {

    const [productinp, setproductinp] = useState<ProdInp>({
        name: '',
        slug: '',
        model: '',
        productNormalPrice: 0,
        productSalePrice: 0,

        metatitle: '',
        metakeyword: '',
        metadiscrip: '',

        category: '',
        categoryslug: '',
        parentcategory: '',

        shortdiscrip: '',
        discription: '',
        mainproductimg: '',
        productimg: '',
        productrpd: '',
        weight: 0,
        lenght: 0,
        width: 0,
        height: 0,
    })

    const [isPublish, setisPublish] = useState<boolean>(false);
    const [isStatus, setisStatus] = useState<boolean>(false);
    const [isFeatured, setisFeatured] = useState<boolean>(false);

    const [allCate, setallCate] = useState<AllCategory[]>([]);
    const [allBanner, allBetbanner] = useState<any>([]);
    const [shortDisInp, setshortDisInp] = useState<string>('');
    const [longDisInp, setlongDisInp] = useState<string>('');
    const [loader, setloader] = useState(false);
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [selectedbrand, setSelectedbrand] = useState<any>(null);
    useEffect(() => {
        const fetchPrevProd = async () => {
            await fetch(`/api/product/products/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                        setproductinp(res.result);
                        setshortDisInp(res.result.shortdiscrip);
                        setlongDisInp(res.result.discription);
                        setisPublish(res.result.isPublish);
                        setisStatus(res.result.isStatus);
                        setisFeatured(res.result.isFeatured);
                        setSelectedOption(res.result.categoryArr);
                        setSelectedbrand(res.result.brand)
                    }
                    else if (res.status === 400) {
                        toast.error(res.message);
                    }
                    else if (res.status === 500) {
                        toast.error(res.message);
                    }
                    // setloader(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }


        if (id) {
            fetchPrevProd();
        }


    }, [id])

    useEffect(() => {
        const fetchCateData = async () => {
            // setloader(true);
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
                    // setloader(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        const fetchBrandData = async () => {
            // setloader(true);
            await fetch('/api/product/brand', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                        allBetbanner(res.result);
                    }
                    else if (res.status === 400) {
                        toast.error(res.message);
                    }
                    else if (res.status === 500) {
                        toast.error(res.message);
                    }
                    // setloader(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        fetchCateData();
        fetchBrandData();
    }, [])


    const onProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloader(true);

        const priceDiff = productinp.productNormalPrice - productinp.productSalePrice;
        const priceDiffPercent = (priceDiff / productinp.productNormalPrice) * 100;

        const Catdata = [];
        for (let i = 0; i < selectedOption.length; i++) {
            Catdata.push(selectedOption[i].name)
        }

        const prodData = {
            name: productinp.name,
            slug: productinp.slug,
            model: productinp.model,
            productNormalPrice: productinp.productNormalPrice,
            productSalePrice: productinp.productSalePrice,
            metatitle: productinp.metatitle,
            metakeyword: productinp.metakeyword,
            metadiscrip: productinp.metadiscrip,
            category: Catdata,
            shortdiscrip: shortDisInp,
            discription: longDisInp,
            mainproductimg: productinp.mainproductimg,
            productimg: productinp.productimg,
            productrpd: productinp.productrpd,
            isPublish: isPublish,
            isStatus: isStatus,
            isFeatured: isFeatured,
            productPriceDiffAmt: priceDiff,
            productPriceDiffpercent: priceDiffPercent,
            brand: selectedbrand.name,
            weight: productinp.weight,
            lenght: productinp.lenght,
            width: productinp.width,
            height: productinp.height,
        }
        console.log(prodData)

        const prodURL = id ? `/api/product/products/${id}` : '/api/product/products/'

        await fetch(prodURL, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prodData),
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

    const customStyles = {
        control: (provided: any, state: any) => ({
            borderRadius: '4px',
            backgroundColor: 'rgb(75 85 99 / 1)',
            boxShadow: state.isFocused ? '0 0 3px rgba(0, 0, 0, 0.3)' : 'none',
            display: 'flex',
            padding: '4px',
        }),
        menu: (provided: any) => ({
            backgroundColor: 'rgb(75 85 99 / 1)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #eee',
            padding: '4px'
        }),
        option: (provided: any, state: any) => ({
            backgroundColor: 'rgb(75 85 99 / 1)',
            color: 'white',
            borderBottom: '1px solid #eee',
            padding: '4px 10px'
        }),
        multiValue: (provided: any, state: any) => ({
            backgroundColor: 'rgb(75 85 99 / 1)',
            border: '1px solid #eee',
            display: 'flex',
            padding: '3px',
            borderRadius: '4px',
            gap: '4px',
        }),
        multiValueLabel: (provided: any, state: any) => ({
            color: 'white',
        }),
        singleValue: (provided: any, state: any) => ({
            color: 'white',
            padding: '4px',
        }),
        valueContainer: (provided: any, state: any) => ({
            display: 'flex',
            width: '100%',
            alignItems: 'center',
        }),
    };




    return (
        <form onSubmit={onProductSubmit} className="relative items-center">

            {
                loader ? <Loader /> : null
            }

            <div className="mb-4 form-inp">
                <label htmlFor="name" className="form-label">Product Name</label>
                <input type="text" name='name' className="form-ctrl" placeholder='Product Name' required
                    onChange={(e) => setproductinp({ ...productinp, name: e.target.value })}
                    value={'' || productinp.name}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="slug" className="form-label">Product Slug</label>
                <input type="text" name='slug' className="form-ctrl" placeholder='Product Slug' required
                    onChange={(e) => setproductinp({ ...productinp, slug: e.target.value })}
                    value={'' || productinp.slug}
                />
            </div>

            <div className="grid grid-cols-3 gap-5">
                <div className="mb-4 form-inp">
                    <label htmlFor="model" className="form-label">Product Model</label>
                    <input type="text" name='model' className="form-ctrl" placeholder='Product Model' required
                        onChange={(e) => setproductinp({ ...productinp, model: e.target.value })}
                        value={'' || productinp.model}
                    />
                </div>
                <div className="mb-4 form-inp">
                    <label htmlFor="productNormalPrice" className="form-label">Product Normal Price</label>
                    <input type="number" name='productNormalPrice' className="form-ctrl" placeholder='Product Normal Price' required
                        onChange={(e) => setproductinp({ ...productinp, productNormalPrice: parseInt(e.target.value) })}
                        value={'' || productinp.productNormalPrice}
                    />
                </div>
                <div className="mb-4 form-inp">
                    <label htmlFor="productSalePrice" className="form-label">Product Sales Price</label>
                    <input type="number" name='productSalePrice' className="form-ctrl" placeholder='Product Sales Price'
                        onChange={(e) => setproductinp({ ...productinp, productSalePrice: parseInt(e.target.value) })}
                        value={'' || productinp.productSalePrice}
                    />
                </div>
            </div>

            <div className="mb-4">
                <fieldset className="border border-gray-600 p-5 rounded-lg">
                    <legend>Product Meta Data :</legend>

                    <div className="mb-4 form-inp">
                        <label htmlFor="metatitle" className="form-label">Product Meta Title</label>
                        <input type="text" name='metatitle' className="form-ctrl" placeholder='Product Meta Title' required
                            onChange={(e) => setproductinp({ ...productinp, metatitle: e.target.value })}
                            value={'' || productinp.metatitle}
                        />
                    </div>
                    <div className="mb-4 form-inp">
                        <label htmlFor="metakeyword" className="form-label">Product Meta Keyword</label>
                        <input type="text" name='metakeyword' className="form-ctrl" placeholder='Product Meta Keyword' required
                            onChange={(e) => setproductinp({ ...productinp, metakeyword: e.target.value })}
                            value={'' || productinp.metakeyword}
                        />
                    </div>
                    <div className="mb-2 form-inp">
                        <label htmlFor="metadiscrip" className="form-label">Product Meta Discription</label>
                        <input type="text" name='metadiscrip' className="form-ctrl" placeholder='Product Meta Discription' required
                            onChange={(e) => setproductinp({ ...productinp, metadiscrip: e.target.value })}
                            value={'' || productinp.metadiscrip}
                        />
                    </div>

                </fieldset>
            </div>

            <div className="mb-4 form-inp">
                <label htmlFor="img" className="form-label">Choose Category</label>
                <Select styles={customStyles}
                    value={selectedOption}
                    onChange={(option: any | null) => {
                        setSelectedOption(option);
                    }}
                    getOptionLabel={(allCate: any) => allCate.name}
                    getOptionValue={(allCate: any) => allCate.name}
                    options={allCate}
                    isClearable={true} isMulti
                    backspaceRemovesValue={true}
                />
            </div>

            <div className="mb-4 form-inp">
                <label htmlFor="img" className="form-label">Choose Brand</label>
                <Select styles={customStyles}
                    value={allBanner.filter((item: any) => item.name === selectedbrand)}
                    onChange={(option: any | null) => {
                        setSelectedbrand(option);
                        console.log(option)
                    }}
                    getOptionLabel={(allBanner: any) => allBanner.name}
                    getOptionValue={(allBanner: any) => allBanner.name}
                    options={allBanner}
                    isClearable={true}
                    backspaceRemovesValue={true}
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="mb-2 form-inp">
                    <label htmlFor="weight" className="form-label">Product weight (KG)</label>
                    <input type="number" name='weight' className="form-ctrl" placeholder='Product weight' required
                        onChange={(e) => setproductinp({ ...productinp, weight: parseInt(e.target.value) })}
                        value={productinp.weight.toString()}
                    />
                </div>
                <div className="mb-2 form-inp">
                    <label htmlFor="lenght" className="form-label">Product lenght (CM)</label>
                    <input type="number" name='lenght' className="form-ctrl" placeholder='Product lenght' required
                        onChange={(e) => setproductinp({ ...productinp, lenght: parseInt(e.target.value) })}
                        value={productinp.lenght.toString()}
                    />
                </div>
                <div className="mb-2 form-inp">
                    <label htmlFor="width" className="form-label">Product width (KG)</label>
                    <input type="number" name='width' className="form-ctrl" placeholder='Product width' required
                        onChange={(e) => setproductinp({ ...productinp, width: parseInt(e.target.value) })}
                        value={productinp.width.toString()}
                    />
                </div>
                <div className="mb-2 form-inp">
                    <label htmlFor="height" className="form-label">Product height (KG)</label>
                    <input type="number" name='height' className="form-ctrl" placeholder='Product height' required
                        onChange={(e) => setproductinp({ ...productinp, height: parseInt(e.target.value) })}
                        value={productinp.height.toString()}
                    />
                </div>
            </div>

            <div className="mb-4 form-inp">
                <label htmlFor="img" className="form-label">Short Discription</label>
                <div className="ckeditor-bg">
                    <CKEditor
                        editor={ClassicEditor}
                        data="<p>Short Discription</p>"
                        onReady={editor => {
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setshortDisInp(data);
                        }}
                    />
                </div>
            </div>

            <div className="mb-4 form-inp">
                <label htmlFor="img" className="form-label">Discription</label>
                <div className="ckeditor-bg">
                    <CKEditor
                        editor={ClassicEditor}
                        data="<p>Discription</p>"
                        onReady={editor => {
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setlongDisInp(data);
                        }}
                    />
                </div>
            </div>

            <div className="mb-4 form-inp">
                <label htmlFor="mainproductimg" className="form-label">Product Main Image</label>
                <input type="text" name='mainproductimg' className="form-ctrl" placeholder='Product Main Image'
                    onChange={(e) => setproductinp({ ...productinp, mainproductimg: e.target.value })}
                    value={'' || productinp.mainproductimg}
                />
            </div>

            <div className="mb-4 form-check">
                <label className="form-label" htmlFor="productimg">Product Image </label>
                <textarea className="form-ctrl" id="productimg" name="productimg" rows={4}
                    onChange={(e) => setproductinp({ ...productinp, productimg: e.target.value })}
                    value={'' || productinp.productimg} />
            </div>

            <div className="mb-4 form-check">
                <label className="form-label" htmlFor="productrpd">Product RPD Image </label>
                <textarea className="form-ctrl" id="productrpd" name="productrpd" rows={4}
                    onChange={(e) => setproductinp({ ...productinp, productrpd: e.target.value })}
                    value={'' || productinp.productrpd} />
            </div>

            {/* <div className="mb-4 form-inp">
                <fieldset className="border border-gray-600 p-5 rounded-lg">
                    <legend>Product Image :</legend>
                    {mainProdImg.map((element, index) => (
                        <div className="form-inline flex gap-5 items-end" key={index}>
                            <div className="w-1/6">
                                <label className="form-label">Order</label>
                                <input className="form-ctrl" type="text" name="order" value={element.order} onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div className="w-2/5">
                                <label className="form-label">Image Link</label>
                                <input className="form-ctrl" type="text" name="imglink" value={element.imglink} onChange={(e) => handleChange(index, e)} />
                            </div>

                            <div className="button-section flex gap-2">
                                <button className=" bg-green-800 h-full p-2 rounded-lg text-sm" type="button" onClick={addFormFields}>
                                    Add
                                </button>
                                {index ? (
                                    <button type="button" className=" bg-red-500 h-full p-2 rounded-lg text-sm" onClick={() => removeFormFields(index)}>
                                        Remove
                                    </button>
                                ) : null}
                            </div>

                        </div>
                    ))}
                </fieldset>
            </div>

            <div className="mb-4 form-inp">
                <fieldset className="border border-gray-600 p-5 rounded-lg">
                    <legend>Product RPD Images :</legend>
                    {rpdProdImg.map((element, index) => (
                        <div className="form-inline flex gap-5 items-end" key={index}>
                            <div className="w-1/6">
                                <label className="form-label">Order</label>
                                <input className="form-ctrl" type="text" name="order" value={element.order} onChange={(e) => handleChangerpd(index, e)} />
                            </div>
                            <div className="w-2/5">
                                <label className="form-label">Image Link</label>
                                <input className="form-ctrl" type="text" name="imglink" value={element.imglink} onChange={(e) => handleChangerpd(index, e)} />
                            </div>

                            <div className="button-section flex gap-2">
                                <button className=" bg-green-800 h-full p-2 rounded-lg text-sm" type="button" onClick={addFormFieldsrpd}>
                                    Add
                                </button>
                                {index ? (
                                    <button type="button" className=" bg-red-500 h-full p-2 rounded-lg text-sm" onClick={() => removeFormFieldsrpd(index)}>
                                        Remove
                                    </button>
                                ) : null}
                            </div>

                        </div>
                    ))}
                </fieldset>
            </div> */}

            <div className="grid grid-cols-3 gap-5">
                <div className="mb-4 form-check ">
                    <input type="checkbox" className="form-ctrl checkbox cursor-pointer" id="isPublish" name="isPublish"
                        onChange={(e) => setisPublish(e.target.checked)}
                        checked={isPublish} />
                    <label className="form-label cursor-pointer" htmlFor="isPublish">IS Publish</label>
                </div>

                <div className="mb-4 form-check ">
                    <input type="checkbox" className="form-ctrl checkbox cursor-pointer" id="isStatus" name="isStatus"
                        onChange={(e) => setisStatus(e.target.checked)}
                        checked={isStatus} />
                    <label className="form-label cursor-pointer" htmlFor="isStatus">IS Status</label>
                </div>

                <div className="mb-4 form-check ">
                    <input type="checkbox" className="form-ctrl checkbox cursor-pointer" id="isFeatured" name="isFeatured"
                        onChange={(e) => setisFeatured(e.target.checked)}
                        checked={isFeatured} />
                    <label className="form-label cursor-pointer" htmlFor="isFeatured">IS Featured</label>
                </div>

            </div>

            <button type='submit' className='dashboard-btn'>Submit</button>
        </form>
    )
}
