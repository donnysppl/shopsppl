"use client";

import { useRouter } from 'next/navigation';
import '../backend-dashboard/dashboard.css';

import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Toaster, toast } from 'react-hot-toast';

export default function BackendLogin() {

  interface adminData {
    email: string;
    password: string;
  }

  const router = useRouter();

  const [showPass, setshowPass] = useState(false);
  const [loginInp, setloginInp] = useState({
    email: '',
    password: ''
  })
  const [loading, setloading] = useState(false)

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setloading(true);
    e.preventDefault();

    const adminSubmitData: adminData = {
      email: loginInp.email,
      password: loginInp.password,
    }

    await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify(adminSubmitData),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          toast.success(res.message)
          window.localStorage.setItem('admin-token', res.tokenData)
          router.push('/backend/backend-dashboard');
          setloading(false);
        }
        else if (res.status === 400) {
          toast.error(res.message)
          setloading(false);
        }
        else if (res.status === 500) {
          toast.error(res.message)
          setloading(false);
        }
      })
      .catch(err => {
        console.log(err);

      })
  }


  return (
    <>
    <Toaster position="bottom-center" reverseOrder={false} />
   
      <main className='backend-dashboard w-screen h-screen flex justify-center items-center p-2 relative'>
      {
                loading ?
                    <div className="razor-loader bg-gray-900 bg-opacity-25 w-screen h-full absolute inset-0
                z-10 flex items-center justify-center">
                        <div className="spinner"></div>
                    </div> : null
            }
        <div className='w-full lg:w-2/5 md:w-9/12 sm:w-full border border-gray-500 py-8 px-8 rounded-2xl'>
          <div className="backend-login-div">

            <h1 className='font-semibold text-center mb-5 mt-4'>Hello There 👋</h1>
            <form onSubmit={onLogin} className="backend-login-form">

              <div className="mb-4 form-inp">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" name='email' className="form-ctrl" placeholder='Email'
                  onChange={(e) => setloginInp({ ...loginInp, email: e.target.value })} />
              </div>

              <div className="mb-4 form-inp">
                <label htmlFor="password" className="form-label">Password</label>
                <div className='relative'>
                  <input type={showPass ? "text" : "password"} name='password' className="form-ctrl" placeholder='Password'
                    onChange={(e) => setloginInp({ ...loginInp, password: e.target.value })} />
                  <div className="password-show" onClick={() => setshowPass(!showPass)}>
                    {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </div>
                </div>
              </div>

              <div>
                <button type='submit' className='dashboard-btn'>Submit</button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </>
  )
}
