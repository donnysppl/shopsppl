"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

export default function CustomerDashboard() {

  const router = useRouter();

  const onLogoutCust = async () => {
    await fetch('/api/customeruser/logout', {
      method: 'GET',
    }).then(res => res.json())
    .then(res => {
        if (res.status === 200) {
            toast.success(res.message);
            router.push('/customer/login');
        }
    })
    .catch(err => {
        console.log(err);
    })
  }

  return (
    <main className="max-w-screen-xl px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap gap-10">

      <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-xl shadow-xl">
        <div className="dashboard-nav">
          <ul>
            <li>Dashboard</li>
            <li>Order</li>
            <li><button onClick={onLogoutCust} className='btn-prim'>Logout</button></li>
          </ul>
        </div>

      </div>

      <div className="lg:w-2/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-xl shadow-xl">

      </div>

    </main>
  )
}
