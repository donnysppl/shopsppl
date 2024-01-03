"use client";
import LoaderFront from '@/components/front/Loader';
import GoogleBtnLogin from '@/helpers/GoogleBtnLogin';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface cusSiguptype {
    username: string, email: string, password: string, phone: string, isWhatsappNo: boolean
}

export default function CustomerSignup() {
    const router = useRouter();
    const [loader, setloader] = useState<boolean>(false);
    const [cusSigupInp, setcusSigupInp] = useState<cusSiguptype>({
        username: '', email: '', password: '', phone: '', isWhatsappNo: true
    })
    const [otpOption, setotpOption] = useState<boolean>(false)
    const [otpInp, setotpInp] = useState<string>('');
    const [signres, setsignres] = useState<string>('');

    const onSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloader(true);
        console.log(cusSigupInp)
        await fetch('/api/customeruser/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cusSigupInp)
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    toast.success(res.message)
                    setotpOption(true);
                    setloader(false);
                    setsignres(res.result?._id)
                }
                else if (res.status === 400) {
                    toast.error(res.message)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onOtpVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setloader(true)
        await fetch('/api/customeruser/verifyotp?customerfunc=signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customerID: signres, otp: otpInp
            })
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    toast.success(res.message)
                    router.push('/customer/login')
                    setloader(false)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <section className='bg-indigo-900 h-screen '>
            <main className='py-20 px-1.5'>
                <div className='flex items-center justify-center mb-4'>
                    <img src="/img/logo.png" alt='logo' className='w-32' />
                </div>
                <div className="max-w-xl mx-auto bg-white md:p-10 p-5 rounded-xl relative overflow-hidden">
                    {
                        loader ? <LoaderFront /> : null
                    }

                    <h2 className='text-gray-900 text-center text-2xl title-font font-bold mb-4 leading-normal'>Sign Up</h2>



                    <div className="">
                        <GoogleBtnLogin title='Sign Up' />
                    </div>

                    <div className="sperator flex items-center justify-center gap-1 my-5">
                        <span className="md:w-[150px] w-full border-b h-[1px] border-slate-200 border-opacity-50"></span>
                        <span className="md:w-[150px] w-full text-center text-slate-500 text-[0.8rem] font-semibold">Or</span>
                        <span className="md:w-[150px] w-full border-b h-[1px] border-slate-200 border-opacity-50"></span>
                    </div>

                    <form className='front-form relative' onSubmit={onSignupSubmit}  >

                        <div className="mb-4">
                            <label htmlFor="username" className="form-label">Name</label>
                            <input type="text" name='username' className="form-control" required placeholder='Name'
                                onChange={(e) => setcusSigupInp({ ...cusSigupInp, username: e.target.value })} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="form-label">Mobile No.</label>
                            <input type="tel" name='phone' className="form-control" placeholder='Mobile No.' required pattern="[1-9]{1}[0-9]{9}"
                                onChange={(e) => setcusSigupInp({ ...cusSigupInp, phone: e.target.value })} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" name='email' className="form-control" required placeholder='Email address'
                                onChange={(e) => setcusSigupInp({ ...cusSigupInp, email: e.target.value })} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label" >Password</label>
                            <input type="password" name='password' className="form-control" placeholder='password' required
                                onChange={(e) => setcusSigupInp({ ...cusSigupInp, password: e.target.value })} />
                        </div>


                        <button type="submit" className='btn-prim w-full'>Submit</button>
                    </form>



                    {
                        otpOption ?
                            <form onSubmit={onOtpVerify} className='front-form mt-4'>
                                <h4 className='text-gray-900 text-lg title-font font-bold mb-4 leading-normal'>OTP sent on {cusSigupInp?.email}. Please check your mail.</h4>
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
                    <h5 className='text-gray-200 text-sm'>Have a account? <Link className='underline font-semibold' href={'/customer/login'}>Login Now</Link></h5>
                </div>
            </main>
        </section>
    )
}
