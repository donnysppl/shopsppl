"use client";

import { useEffect, useState, useMemo } from "react";
import CommonTable from '@/components/table/CommonTable';
import Link from "next/link";
import toast from 'react-hot-toast';

export default function BrandList() {

    const [tableData, settableData] = useState([]);

    useEffect(() => {
        const fetchTableData = async () => {
            await fetch('/api/product/brand', {
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                        settableData(res.result);
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
        fetchTableData();
    }, [])

    const onDeleteBrand = async (e, id) => {
        e.preventDefault();
        await fetch(`/api/product/brand/${id}`, {
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
            })
            .catch(err => {
                console.log(err);
            })
    }

    const data = useMemo(() => tableData, [tableData])

    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const columns = [
        {
            header: 'ID',
            accessorFn: (row, index) => index + 1,
            footer: 'ID',
        },
        {
            header: 'Brand Name',
            accessorKey: 'name',
            footer: 'Brand Name',
        },
        {
            header: 'Brand Slug',
            accessorKey: 'slug',
            footer: 'Brand Slug',
        },
        {
            header: 'Brand Image',
            accessorKey: 'img',
            footer: 'Brand Image',
        },
        {
            header: 'Action',
            cell: cell => (
                <div className="flex gap-5">
                    <Link href={`/backend/backend-dashboard/brand/brand-edit/${cell.row.original._id}`}><button className="text-green-400">Edit</button></Link>
                    <button onClick={(e) => onDeleteBrand(e, cell.row.original._id)} className="text-red-400">Delete</button>
                </div>
            )
        }
    ]


    return (


        <div className='inner-pages-base-div form-page-list'>
            <div className="head">
                <h2 className='font-medium'>
                    Brand List
                </h2>
            </div>

            <CommonTable data={data} columns={columns} />
        </div>

    )
}
