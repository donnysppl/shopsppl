"use client";

import { useEffect, useState, useMemo } from "react";
import CommonTable from '@/components/table/CommonTable';
import Link from "next/link";
import toast from 'react-hot-toast';

export default function ListProduct() {

    const [catetableData, setcatetableData] = useState([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const fetchCateTableData = async () => {
            setloading(true);
            await fetch('/api/product/products', {
                method: 'GET',
                cache: 'no-cache',
            }).then(res => res.json())
                .then(res => {
                    if (res.status === 200) {
                        toast.success(res.message);
                        setcatetableData(res.result);
                    }
                    else if (res.status === 400) {
                        toast.error(res.message);
                    }
                    else if (res.status === 500) {
                        toast.error(res.message);
                    }
                    setloading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        fetchCateTableData();
    }, [])

    const onDeleteProduct = async (e, id) => {
        e.preventDefault();
        setloading(true);
        await fetch(`/api/product/products/${id}`, {
            method: 'Delete',
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
                setloading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onFeatureHandle = async (e, id) => {
        e.preventDefault();
        setloading(true);
        await fetch(`/api/product/products/feature/${id}`, {
            method: 'PUT',
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
                // setloading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onisNewHandle = async (e, id) => {
        e.preventDefault();
        setloading(true);
        await fetch(`/api/product/products/new/${id}`, {
            method: 'PUT',
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
                // setloading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const data = useMemo(() => catetableData, [catetableData])

    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const columns = [
        {
            header: 'ID',
            accessorFn: (row, index) => index + 1,
        },
        {
            header: 'Product Name',
            accessorKey: 'name',
        },
        {
            header: 'Model',
            accessorKey: 'model',
        },
        {
            header: 'Brand',
            accessorFn: (row, index) => row.brand,
        },
        {
            header: 'Product Category',
            accessorFn: (row, index) => row.category.toString(),
        },
        {
            header: 'Size',
            accessorFn: (row, index) => parseInt(row.size) + ' ' + (row.sizeOF === 'tv' ? 'inch' : row.sizeOF === 'wm' ? 'kg' : row.sizeOF === 'cooler' ? 'leter' : 'ton'),
        },
        {
            header: 'Sale / Normal Price',
            accessorFn: (row, index) => `${row && row.productSalePrice} / ${row && row.productNormalPrice}`,
        },
        {
            header: 'New',
            cell: cell => (
                <input class="form-check-input" type="checkbox" checked={cell.row.original.isNewProductData} onClick={(e) => onisNewHandle(e,cell.row.original._id)} />
            )
        },
        {
            header: 'Feature',
            cell: cell => (
                <input class="form-check-input" type="checkbox" checked={cell.row.original.isFeatured} onClick={(e) => onFeatureHandle(e,cell.row.original._id)} />
            )
        },
        {
            header: 'Action',
            cell: cell => (
                <div className="flex gap-3">
                    <Link href={`/product/${cell.row.original.slug}`}><button className="view-btn">View</button></Link>
                    <Link href={`/backend/backend-dashboard/product/edit-product/${cell.row.original._id}`}><button className="edit-btn">Edit</button></Link>
                    <button onClick={(e) => onDeleteProduct(e, cell.row.original._id)} className="delete-btn">Delete</button>
                </div>
            )
        }
    ]

    return (

        <div className='inner-pages-base-div dark'>
            <div className="head">
                <div className="flex gap-5">
                    <h2 className='font-medium'>
                        Product List
                    </h2>
                    <Link href={'./export'}><button className="dashboard-btn">Export</button></Link>
                </div>
            </div>

            <div>
                {/* {
                    loading ? 'Loading...' : <CommonTable data={data} columns={columns} />
                } */}
                <CommonTable data={data} columns={columns} loading={loading} />

            </div>
        </div>

    )
}
