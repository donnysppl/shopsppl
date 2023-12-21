'use client';

import { useEffect, useState } from "react";
import Loader from "../Loader";
import Select from 'react-select';
import toast from "react-hot-toast";
import { Product } from "@/helpers/interFace";

type CustomProdFormProps = {
    method: string,
    id?: string,
}
interface customProdPageInp {
    name: string,
    slug: string,
    metatitle: string,
    metadiscription: string,
    metakeyword: string,
}

export default function CustomProdForm({ method, id }: CustomProdFormProps) {

    const [allProd, setallProd] = useState<Product[]>();
    const [customProdPageInp, setcustomProdPageInp] = useState<customProdPageInp>({
        name: '',
        slug: '',
        metatitle: '',
        metadiscription: '',
        metakeyword: '',
    })
    const [customProdID, setcustomProdID] = useState();
    const [loader, setloader] = useState<boolean>(true);

    useEffect(() => {
        setloader(true);
        const fetchProd = async () => {
            await fetch('/api/product/products/cus-list', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
                .then(res => {
                    if (res.status === 200) {
                        setallProd(res.result)
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
        const fetchCustProdData = async () => {
            await fetch(`/api/product/cust-prod-page/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        setcustomProdPageInp(res.result);
                        setcustomProdID(res.result?.productIDs);
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
        fetchProd();
        if(id){
            fetchCustProdData();
        }
        setloader(false);
    }, [])

    const customStyles = {
        control: (provided: any, state: any) => ({
            borderRadius: '4px',
            backgroundColor: 'rgb(229 231 235 / 1)',
            boxShadow: state.isFocused ? '0 0 3px rgba(0, 0, 0, 0.3)' : 'none',
            display: 'flex',
            padding: '4px',
        }),
        menu: (provided: any) => ({
            backgroundColor: 'rgb(229 231 235 / 1)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #eee',
            padding: '4px'
        }),
        option: (provided: any, state: any) => ({
            backgroundColor: 'rgb(229 231 235 / 1)',
            color: '#111827',
            borderBottom: '1px solid rgb(229 231 235 / 0.5)',
            padding: '4px 10px'
        }),
        multiValue: (provided: any, state: any) => ({
            backgroundColor: 'rgb(229 231 235 / 1)',
            border: '1px solid #111827',
            display: 'flex',
            padding: '3px',
            borderRadius: '4px',
            gap: '4px',
            color: '#111827',
        }),
        multiValueLabel: (provided: any, state: any) => ({
            color: '#111827',
        }),
        singleValue: (provided: any, state: any) => ({
            color: '#111827',
            padding: '4px',
        }),
        valueContainer: (provided: any, state: any) => ({
            ...provided,
            display: 'flex',
            width: '100%',
            flexDirection: 'column' as const,
            fontSize: '14px',
            gap: '4px',

        }),
    };

    const custProdPageFn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloader(true);

        const data = {
            name: customProdPageInp.name,
            slug: customProdPageInp.slug,
            metatitle: customProdPageInp.metatitle,
            metadiscription: customProdPageInp.metadiscription,
            metakeyword: customProdPageInp.metakeyword,
            productIDs: customProdID,
        }

        const pageURL = id ? `/api/product/cust-prod-page/${id}` : '/api/product/cust-prod-page';

        await fetch(pageURL, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === 200) {
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

    return (
        <div className='relative'>
            {loader ? <Loader /> : null}
            <form className='p-3 relative' onSubmit={custProdPageFn} >

                <div className="mb-4 form-inp">
                    <label htmlFor="name" className="form-label">Page Name</label>
                    <input type="text" name='name' className="form-ctrl" placeholder='Page Name'
                        onChange={(e) => setcustomProdPageInp({ ...customProdPageInp, name: e.target.value })}
                        value={'' || customProdPageInp.name}
                    />
                </div>

                <div className="mb-4 form-inp">
                    <label htmlFor="title" className="form-label">Page slug</label>
                    <input type="text" name='slug' className="form-ctrl" placeholder='Page slug'
                        onChange={(e) => setcustomProdPageInp({ ...customProdPageInp, slug: e.target.value })}
                        value={'' || customProdPageInp.slug}
                    />
                </div>

                <div className="mb-4 form-inp">
                    <label htmlFor="metatitle" className="form-label">Page metatitle</label>
                    <input type="text" name='metatitle' className="form-ctrl" placeholder='Page metatitle'
                        onChange={(e) => setcustomProdPageInp({ ...customProdPageInp, metatitle: e.target.value })}
                        value={'' || customProdPageInp.metatitle}
                    />
                </div>

                <div className="mb-4 form-inp">
                    <label htmlFor="metadiscription" className="form-label">Page metadiscription</label>
                    <input type="text" name='metadiscription' className="form-ctrl" placeholder='Page metadiscription'
                        onChange={(e) => setcustomProdPageInp({ ...customProdPageInp, metadiscription: e.target.value })}
                        value={'' || customProdPageInp.metadiscription}
                    />
                </div>

                <div className="mb-4 form-inp">
                    <label htmlFor="metakeyword" className="form-label">Page metakeyword</label>
                    <input type="text" name='metakeyword' className="form-ctrl" placeholder='Page metakeyword'
                        onChange={(e) => setcustomProdPageInp({ ...customProdPageInp, metakeyword: e.target.value })}
                        value={'' || customProdPageInp.metakeyword}
                    />
                </div>

                {
                    allProd ?
                        <div className="mb-4 form-inp">
                            <label htmlFor="img" className="form-label">Choose Product </label>
                            <Select styles={customStyles}
                                value={customProdID}
                                onChange={(option: any | null) => {
                                    setcustomProdID(option);
                                }}
                                getOptionLabel={(allProd: any) => allProd.name}
                                getOptionValue={(allProd: any) => allProd._id}
                                options={allProd}
                                isClearable={true} isMulti
                                backspaceRemovesValue={true} />
                        </div> : null
                }

                <button type='submit' className='dashboard-btn'>Submit</button>

            </form>
        </div>
    )
}
