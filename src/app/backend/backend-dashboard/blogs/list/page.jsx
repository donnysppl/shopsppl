"use client";

import { useEffect, useState, useMemo } from "react";
import CommonTable from '@/components/table/CommonTable';
import Link from "next/link";
import toast from 'react-hot-toast';

export default function BlogListBK() {
  const [tableData, settableData] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setloading(true)
    const fetchTableData = async () => {
      await fetch('/api/blog', {
        method: 'GET',
        cache: "no-cache"
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
          setloading(false)
        })
        .catch(err => {
          console.log(err);
        })
    }
    fetchTableData();
  }, [])

  const onDeleteBlog = async (e, id) => {
    e.preventDefault();
    setloading(true)
    await fetch(`/api/blog/${id}`, {
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
        setloading(false)
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
      header: 'Blog Title',
      accessorKey: 'title',
    },
    {
      header: 'Action',
      cell: cell => (
        <div className="flex gap-5">
          <Link href={`/backend/backend-dashboard/blogs/edit/${cell.row.original._id}`}><button className="edit-btn">Edit</button></Link>
          <button onClick={(e) => onDeleteBlog(e, cell.row.original._id)} className="delete-btn">Delete</button>
        </div>
      )
    }
  ]

  return (
    <div className='inner-pages-base-div'>
      <div className="head">
        <h2 className='font-medium'>
          Blog List
        </h2>
      </div>

      <CommonTable data={data} columns={columns} loading={loading} />
    </div>
  )
}
