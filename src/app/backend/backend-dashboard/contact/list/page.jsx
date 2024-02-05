"use client";

import { useEffect, useState, useMemo } from "react";
import CommonTable from '@/components/table/CommonTable';
import Link from "next/link";
import toast from 'react-hot-toast';
import moment from "moment";

export default function ContactList() {

    const [conttableData, setconttableData] = useState([]);
    const [loading, setloading] = useState(false);


    useEffect(() => {
        const fetchContTableData = async () => {
            setloading(true);
            await fetch('/api/contact', {
                method: 'GET',
                cache: 'no-cache',
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                        const result = res.result.reverse();
                        setconttableData(result);
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
        fetchContTableData();
    }, [])

    const data = useMemo(() => conttableData, [conttableData])

    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const columns = [
        {
            header: 'ID',
            accessorFn: (row, index) => index + 1,
            footer: 'ID',
        },
        {
            header: 'Name',
            accessorKey: 'name',
            footer: 'Name',
        },
        {
            header: 'Email',
            accessorKey: 'email',
            footer: 'Email',
        },
        {
            header: 'Phone No.',
            accessorKey: 'phone',
            footer: 'Phone No.',
        },
        {
            header: 'Contact Type',
            accessorKey: 'type',
            footer: 'Contact Type',
        },
        {
            header: 'Date & Time',
            accessorFn: (row, index) => moment(row.createdAt).format('lll'),
            footer: 'Date & Time',
        },
        {
            header: 'Message',
            accessorKey: 'message',
            footer: 'Message',
        }
    ]

    return (
        <div className='inner-pages-base-div form-page-list'>
            <div className="head grid grid-cols-5">
                <h2 className='font-medium'>
                    Contact List
                </h2>

            </div>

            <div>
                <CommonTable data={data} columns={columns} loading={loading} />
            </div>
        </div>
    )
}
