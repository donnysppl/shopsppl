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
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
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
            header: 'Product Category',
            accessorFn: (row, index) => row.category.toString(),
        },
        {
            header: 'Sale / Normal Price',
            accessorFn: (row, index) => `${row && row.productSalePrice} / ${row && row.productNormalPrice}`,
        },
        {
            header: 'Action',
            cell: cell => (
                <div className="flex gap-5">
                    <Link href={`/backend/backend-dashboard/product/edit-product/${cell.row.original._id}`}><button className="text-green-400">Edit</button></Link>
                    <button onClick={(e) => onDeleteProduct(e, cell.row.original._id)} className="text-red-400">Delete</button>
                </div>
            )
        }
    ]

    return (

        <div className='inner-pages-base-div'>
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
