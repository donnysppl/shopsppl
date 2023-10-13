// "use client";
// import { useRouter } from 'next/navigation';
import React from 'react'
// import toast from 'react-hot-toast';
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import { BsCart4 } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";

export default function CustomerDashboard() {

  // const router = useRouter();

  // const onLogoutCust = async () => {
  //   await fetch('/api/customeruser/logout', {
  //     method: 'GET',
  //   }).then(res => res.json())
  //   .then(res => {
  //       if (res.status === 200) {
  //           toast.success(res.message);
  //           router.push('/customer/login');
  //       }
  //   })
  //   .catch(err => {
  //       console.log(err);
  //   })
  // }

  return (
    <main className="max-w-screen-2xl px-5 py-20 mx-auto flex sm:flex-nowrap flex-wrap gap-10">

      <div className="lg:w-1/4 md:w-1/3 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-xl shadow-xl">
        <div className="dashboard-nav p-6">
          <div className="usericon">
            <BiSolidUserCircle className='w-[75px] h-[75px] rounded-full opacity-70' />

            <ul className='pb-4 mb-3 border-b border-gray-300'>
              <li>Customer name</li>
              <li>Customer email</li>
            </ul>
          </div>
          <ul>
            <li className='flex font-medium items-center gap-3 py-2 px-2 hover:bg-gray-100 active:bg-gray-100 rounded-lg'><LuLayoutDashboard /> Dashboard</li>
            <li className='flex font-medium items-center gap-3 py-2 px-2 hover:bg-gray-100 active:bg-gray-100 rounded-lg'><BsCart4 /> Order</li>
            <li className='flex font-medium items-center gap-3 py-2 px-2 hover:bg-gray-100 active:bg-gray-100 rounded-lg' ><LuLogOut /> Logout</li>
          </ul>
        </div>

      </div>

      <div className="lg:w-3/4 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-xl shadow-xl">
        <div className="dashboard-data p-4">
        <h2>Welcome to your account page</h2>
        </div>
      </div>

    </main>
  )
}
