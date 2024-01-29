"use client";

import { useEffect, useState, useMemo } from "react";
import CommonTable from '@/components/table/CommonTable';
import Link from "next/link";
import toast from 'react-hot-toast';

export default function ListAdmin() {

  const [catetableData, setcatetableData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchCateTableData = async () => {
      setloading(true);
      await fetch('/api/admin/list', {
        method: 'GET',
        cache:'no-cache',
      }).then(res => res.json())
        .then(res => {
          console.log(res)
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
    // await fetch(`/api/product/products/${id}`, {
    //   method: 'Delete',
    // }).then(res => res.json())
    //   .then(res => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       toast.success(res.message);
    //       window.location.reload();
    //     }
    //     else if (res.status === 400) {
    //       toast.error(res.message);
    //     }
    //     else if (res.status === 500) {
    //       toast.error(res.message);
    //     }
    //     setloading(false);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
  }

  const data = useMemo(() => catetableData, [catetableData])

  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const columns = [
    {
      header: 'ID',
      accessorFn: (row, index) => index + 1,
    },
    {
      header: 'Admin Name',
      accessorKey: 'username',
    },
    {
      header: 'Admin Role',
      accessorKey: 'adminRole',
    },
    {
      header: 'Admin Email',
      accessorKey: 'email',
    },
    {
      header: 'Action',
      cell: cell => (
        <div className="flex gap-3">
          <button onClick={(e) => onDeleteProduct(e, cell.row.original._id)} className="delete-btn">Delete</button>
        </div>
      )
    }
  ]


  return (
    <div className='inner-pages-base-div form-page'>
      <div className="head">
        <h2 className='font-medium'>
          List Admin
        </h2>
      </div>

      <div className="form-part">
        <CommonTable data={data} columns={columns} loading={loading} />
      </div>
    </div>
  )
}
