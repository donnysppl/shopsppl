"use client";

import { useEffect, useState, useMemo } from "react";
import CommonTable from '@/components/table/CommonTable';
import Link from "next/link";
import toast from 'react-hot-toast';

export default function ListCategory() {

    const [catetableData, setcatetableData] = useState([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const fetchCateTableData = async () => {
            setloading(true);
            await fetch('/api/product/category', {
                method: 'GET',
                next:{revalidate:10},
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                        const result = res.result;
                        if(result){
                            const sortArr = result.sort((a,b) => Number(a.isChild) - Number(b.isChild));
                            setcatetableData(sortArr)
                        }
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

    const onDeleteCategory = async (e, id) => {
        e.preventDefault();
        setloading(true);
        await fetch(`/api/product/category/${id}`, {
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
            footer: 'ID',
        },
        {
            header: 'Category Name',
            accessorKey: 'name',
            footer: 'Category Name',
        },
        {
            header: 'Category Slug',
            accessorKey: 'slug',
            footer: 'Category Slug',
        },
        {
            header: 'Category Image',
            accessorKey: 'img',
            footer: 'Category Image',
        },
        ,
        {
            header: 'Category isChild',
            accessorKey: 'isChild',
        },
        {
            header: 'Action',
            cell: cell => (
                <div className="flex gap-5">
                    <Link href={`/backend/backend-dashboard/category/edit-category/${cell.row.original._id}`}><button className="text-green-400">Edit</button></Link>
                    <button onClick={(e) => onDeleteCategory(e, cell.row.original._id)} className="text-red-400">Delete</button>
                </div>
            )
        }
    ]


    return (


        <div className='inner-pages-base-div form-page-list'>
            <div className="head">
                <h2 className='font-medium'>
                    Category List
                </h2>
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
