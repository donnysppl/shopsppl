"use client";

import LoaderFront from '@/components/front/Loader';
import GoogleBtnLogin from '@/helpers/GoogleBtnLogin';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface cusLoginInp {
  email: string,
  password: string,
}

export default function CustomerLogin() {
  const router = useRouter();

  const [cusLoginInp, setcusLoginInp] = useState<cusLoginInp>({
    email: '',
    password: ''
  })
  const [otpOption, setotpOption] = useState<boolean>(false)
  const [otpInp, setotpInp] = useState<string>('');
  const [cusLoginRes, setcusLoginRes] = useState<string>('');
  const [loader, setloader] = useState<boolean>(false)

  const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloader(true)
    console.log(cusLoginInp)
    await fetch('/api/customeruser/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cusLoginInp)
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setotpOption(true);
          setcusLoginRes(res.result);
          setloader(false)
        }
        else if (res.status === 400) {
          toast.error(res.message)
          setloader(false)
        }
      })
      .catch(err => {
        console.log(err);
      })

  }

  const onOtpVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloader(true)
    await fetch('/api/customeruser/verifyotp?customerfunc=login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerID: cusLoginRes, otp: otpInp
      })
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          const custToken = window.localStorage.getItem("customer-admin")
          if (custToken) {
            window.localStorage.clear();
            window.localStorage.setItem("customer-admin", res.token)
          }
          else {
            window.localStorage.setItem("customer-admin", res.token)
          }
          toast.success(res.message);
          router.push('/customer/dashboard');
          setloader(false);
        }
      })
      .catch(err => {
        console.log(err);
      })

  }


  return (
    <>

      <section className='bg-prim h-full min-h-screen '>
        <main className='py-20 px-1.5'>
          <div className='flex items-center justify-center mb-4'>
            <img src="/img/logo.png" alt='logo' className='w-32' />
          </div>
          <div className="max-w-xl mx-auto bg-white md:p-10 p-5 rounded-xl relative overflow-hidden">
            {
              loader ? <LoaderFront /> : null
            }

            <h2 className='text-gray-900 text-center text-2xl title-font font-bold mb-4 leading-normal'>LOGIN</h2>

            <div className="">
              <GoogleBtnLogin title='Sign In' />
            </div>

            <div className="sperator flex items-center justify-center gap-1 my-5">
              <span className="md:w-[150px] w-full border-b h-[1px] border-slate-200 border-opacity-50"></span>
              <span className="md:w-[150px] w-full text-center text-slate-500 text-[0.8rem] font-semibold">Or</span>
              <span className="md:w-[150px] w-full border-b h-[1px] border-slate-200 border-opacity-50"></span>
            </div>

            <form className='front-form relative' onSubmit={onLoginSubmit}  >

              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" name='email' className="form-control" placeholder='Email address'
                  onChange={(e) => setcusLoginInp({ ...cusLoginInp, email: e.target.value })} />
              </div>
              <div className="mb-4">
                <div className='flex justify-between'>
                  <label htmlFor="password" className="form-label" >Password</label>
                  <Link className="form-label" href={'/customer/forgot-password'}>Forgot Password ?</Link>
                </div>
                <input type="password" name='password' className="form-control" placeholder='password' required
                  onChange={(e) => setcusLoginInp({ ...cusLoginInp, password: e.target.value })} />
              </div>


              <button type="submit" className='btn-prim w-full'>Submit</button>
            </form>


            {
              otpOption ?
                <form onSubmit={onOtpVerify} className='front-form mt-4'>
                  <h4 className='text-gray-900 text-lg title-font font-bold mb-4 leading-normal'>OTP sent on {cusLoginInp?.email}. Please check your mail.</h4>
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label">OTP</label>
                    <input type="text" name='otp' className="form-control" placeholder='otp'
                      onChange={(e) => setotpInp(e.target.value)} />
                  </div>

                  <button type="submit" className='btn-prim'>Submit</button>

                </form>
                : null
            }
          </div>

          <div className='flex items-center justify-center mt-2'>
            <h5 className='text-gray-200 text-sm'>Don&apos;t have a account? <Link className='underline font-semibold' href={'/customer/signup'}>Sign Up Now</Link></h5>
          </div>
        </main>
      </section>
    </>
  )
}
