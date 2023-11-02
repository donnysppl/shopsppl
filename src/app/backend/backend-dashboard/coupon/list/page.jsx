"use client";

import { useEffect, useState, useMemo } from "react";
import CommonTable from '@/components/table/CommonTable';
import Link from "next/link";
import toast from 'react-hot-toast';

export default function CouponList() {

    const [couponTableData, setcouponTableData] = useState([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const fetchCouponTableData = async () => {
            setloading(true);
            await fetch('/api/product/coupon', {
                method: 'GET',
                cache:'no-store',
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                        setcouponTableData(res.result);
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
        fetchCouponTableData();
    }, [])

    const onDeleteCoupon = async (e, id) => {
        e.preventDefault();
        setloading(true);
        await fetch(`/api/product/coupon/${id}`, {
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

    const data = useMemo(() => couponTableData, [couponTableData])

    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const columns = [
        {
            header: 'ID',
            accessorFn: (row, index) => index + 1,
            footer: 'ID',
        },
        {
            header: 'Coupon Name',
            accessorKey: 'name',
        },
        {
            header: 'Condition',
            accessorKey: 'condition',
        },
        {
            header: 'Discount',
            accessorKey: 'discount',
            accessorFn: (row, index) => (row.condition === 'price') ? '₹ ' + row.discount : row.discount + ' %',
        },
        {
            header: 'Min Price',
            accessorFn: (row, index) => '₹ ' + row.min_price,
        },
        {
            header: 'Max Price',
            accessorFn: (row, index) => '₹ ' + row.max_price,
        },
        {
            header: 'Multiuse',
            accessorKey: 'multiuse',
        },
        {
            header: 'Action',
            cell: cell => (
                <div className="flex gap-5">
                    <Link href={`/backend/backend-dashboard/coupon/edit/${cell.row.original._id}`}><button className="text-green-400">Edit</button></Link>
                    <button onClick={(e) => onDeleteCoupon(e, cell.row.original._id)} className="text-red-400">Delete</button>
                </div>
            )
        }
    ]

  return (
    <div className='inner-pages-base-div'>
            <div className="head">
                <h2 className='font-medium'>
                    Coupon List
                </h2>
            </div>

            <div>

                <CommonTable data={data} columns={columns} loading={loading} />

            </div>
        </div>

  )
}
