"use client";

import { useEffect, useState, useMemo } from "react";
import CommonTable from '@/components/table/CommonTable';
import Link from "next/link";
import toast from 'react-hot-toast';
import moment from "moment";

export default function OrderList() {
    const [orderListData, setorderListData] = useState()
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const orderListFetch = async () => {
            await fetch('/api/order', {
                method: 'GET',
                cache: 'no-store',
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                        const arrangeData = res.result.reverse();
                        setorderListData(arrangeData);
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
        orderListFetch();
    }, [])

    const data = useMemo(() => orderListData, [orderListData])

    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const columns = [
        {
            header: 'ID',
            accessorFn: (row, index) => index + 1,
            footer: 'ID',
        },
        {
            header: 'Order',
            accessorFn: (row, index) => row.sppl_orderid + ' ' + row.name,
        },
        {
            header: 'Date',
            accessorFn: (row, index) => moment(row.createdAt).format('MMMM Do YYYY'),
        },
        {
            header: 'Status',
            accessorFn: (row, index) => row.status,
        },
        {
            header: 'Billing Address',
            accessorFn: (row, index) => row.address + ' ' + row.city + ' ' + row.state + ' ' + row.pincode,
        },
        {
            header: 'Total Bill',
            accessorFn: (row, index) => '₹' + row.totalbill,
        },
        {
            header: 'Shipment Tracking',
            cell: cell => (
                <div>
                    {
                        Array.isArray(cell.row.original.ekartData[0]) ? cell.row.original.ekartData[0].map((item, index) => (
                            <span className="block" key={index}>{item.trackingid},</span>
                        ))
                            : cell.row.original.ekartData[0]?.trackingID
                    }

                </div>
            )
        },
        {
            header: 'Action',
            cell: cell => (
                <div className="flex gap-5">
                    <Link href={`/backend/backend-dashboard/order/order-detail/${cell.row.original._id}`}><button className="edit-btn">Detail</button></Link>
                    {/* <button onClick={(e) => onDeleteCategory(e, cell.row.original._id)} className="text-red-400">Delete</button> */}
                </div>
            )
        }
    ]


    return (
        <div className='inner-pages-base-div'>
            <div className="head">
                <h2 className='font-medium'>
                    Order List
                </h2>
            </div>

            <div>
                {
                    loading ? 'Loading...' : <CommonTable data={data} columns={columns} loading={loading} />
                }
                {/* <CommonTable data={data} columns={columns} loading={loading} /> */}

            </div>
        </div>
    )
}
