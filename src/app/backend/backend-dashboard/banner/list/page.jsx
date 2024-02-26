"use client";

import { useEffect, useState, useMemo } from "react";
import CommonTable from '@/components/table/CommonTable';
import Link from "next/link";
import toast from 'react-hot-toast';
import Image from "next/image";

export default function ListBanner() {

    const [tableData, settableData] = useState([]);

    useEffect(() => {
        const fetchTableData = async () => {
            await fetch('/api/banner/list', {
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
        await fetch(`/api/banner/delete/${id}`, {
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
        },
        {
            header: 'Banner Name',
            accessorKey: 'name',
        },
        {
            header: 'Banner Image',
            accessorFn: (row, index) => roe + 1,
            cell: cell => (<Image width={200} height={100} src={`/uploads/banner/${cell.row.original.bannerimg}`} alt="bannerimg" />)
        },
        {
            header: 'Banner Mobile Image',
            accessorFn: (row, index) => roe + 1,
            cell: cell => (<Image width={200} height={100} src={`/uploads/banner/${cell.row.original.bannermobimg}`} alt="bannerimg" />)
        },
        {
          header: 'Banner Order',
          accessorKey: 'order',
      },
        {
            header: 'Action',
            cell: cell => (
                <div className="flex gap-5">
                    <Link href={`/backend/backend-dashboard/banner/edit/${cell.row.original._id}`}><button className="text-green-400">Edit</button></Link>
                    <button onClick={(e) => onDeleteBrand(e, cell.row.original._id)} className="text-red-400">Delete</button>
                </div>
            )
        }
    ]


    return (


        <div className='inner-pages-base-div'>
            <div className="head">
                <h2 className='font-medium'>
                    Banner List
                </h2>
            </div>

            <CommonTable data={data} columns={columns} />
        </div>

    )
}

