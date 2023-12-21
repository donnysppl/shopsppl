"use client";

import { useEffect, useState, useMemo } from "react";
import CommonTable from '@/components/table/CommonTable';
import Link from "next/link";
import toast from 'react-hot-toast';

export default function CustProdPageList() {

  const [pageListData, setpageListData] = useState()
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const custProdPageListFetch = async () => {
      await fetch('/api/product/cust-prod-page', {
        method: 'GET',
        cache: 'no-store',
      }).then(res => res.json())
        .then(res => {
          if (res.status === 200) {
            toast.success(res.message);
            setpageListData(res.result);
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
    custProdPageListFetch();
  }, [])

  const onDeletePages = async (e, id) => {
    setloading(true);
    await fetch(`/api/product/cust-prod-page/${id}`, {
      method: 'DELETE',
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          window.location.reload();
          toast.success(res.message);
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


  const data = useMemo(() => pageListData, [pageListData])

  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const columns = [
    {
      header: 'ID',
      accessorFn: (row, index) => index + 1,
      footer: 'ID',
    },
    {
      header: 'Page Name',
      accessorFn: (row, index) => row.name,
    },
    {
      header: 'Page Link',
      accessorFn: (row, index) => process.env.NEXT_PUBLIC_BASE_URL + '/' + row.slug,
    },
    {
      header: 'Action',
      cell: cell => (
        <div className="flex gap-5">
          <Link href={`/backend/backend-dashboard/pages/custom-product/edit/${cell.row.original._id}`}><button className="text-green-400">Edit</button></Link>
          <button onClick={(e) => onDeletePages(e, cell.row.original._id)} className="text-red-400">Delete</button>
        </div>
      )
    }
  ]

  return (
    <div className='inner-pages-base-div form-page'>
      <div className="head">
        <h2 className='font-medium'>
          Custom Product Page List
        </h2>
      </div>

      <div>
        {
          loading ? 'Loading...' : <CommonTable data={data} columns={columns} loading={loading} />
        }
      </div>
    </div>
  )
}
