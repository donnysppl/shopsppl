"use client";
import LoaderFront from '@/components/front/Loader';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface cusForgottype {
    email: string,
    password: string
}

export default function CustomerForgotPassword() {
    const router = useRouter();
    const [loader, setloader] = useState<boolean>(false);
    const [cusForgotInp, setcusForgotInp] = useState<cusForgottype>({
        email: '',
        password: ''
    });
    const [otpOption, setotpOption] = useState<boolean>(false);
    const [otpInp, setotpInp] = useState<string>('');
    const [cusForgotRes, setcusForgotRes] = useState<string>('');

    const onForgotPassSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setotpOption(true);
        await fetch('/api/customeruser/forgotpassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cusForgotInp)
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setotpOption(true);
                    setcusForgotRes(res.result._id);
                    setloader(false);
                    toast.success(res.message);
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
        e.preventDefault();
        setloader(true)
        await fetch('/api/customeruser/verifyotp?customerfunc=forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customerID: cusForgotRes, otp: otpInp
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
        <main className='py-20'>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl drop-shadow-2xl relative overflow-hidden">
                {
                    loader ? <LoaderFront /> : null
                }

                <h2 className='text-gray-900 text-2xl title-font font-bold mb-4 leading-normal'>Forgot Password</h2>

                <form className='front-form relative' onSubmit={onForgotPassSubmit}  >

                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" name='email' className="form-control" placeholder='Email address'
                            onChange={(e) => setcusForgotInp({ ...cusForgotInp, email: e.target.value })} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label" >New Password</label>
                        <input type="password" name='password' className="form-control" placeholder='password' required
                            onChange={(e) => setcusForgotInp({ ...cusForgotInp, password: e.target.value })} />
                    </div>


                    <button type="submit" className='btn-prim'>Submit</button>
                </form>

                {
                    otpOption ?
                        <form onSubmit={onOtpVerify} className='front-form mt-4'>
                            <h4 className='text-gray-900 text-lg title-font font-bold mb-4 leading-normal'>OTP sent on {cusForgotInp?.email}. Please check your mail.</h4>
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

        </main>
    )
}
