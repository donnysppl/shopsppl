"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Product } from "@/helpers/interFace";
import toast from 'react-hot-toast';
import Image from 'next/image';

interface orderInptype {
    email: string,
    name: string,
    phone: number,
    address: string,
    city: string,
    state: string,
    pincode: number,
}

interface RazorOrderes {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string | null;
    offer_id: string | null;
    status: string;
    attempts: number;
    notes: any[]; // Depending on the structure of notes, you might want to create a separate interface for it
    created_at: number;
}

interface CustomWindow extends Window {
    Razorpay?: any;
}

declare var window: CustomWindow;

export const dynamic = 'force-dynamic';

export default function Checkout() {

    const [checkoutProd, setcheckoutProd] = useState<Product[]>([]);
    const [razorOrderRes, setrazorOrderRes] = useState<RazorOrderes>();
    const [prodLoading, setprodLoading] = useState<boolean>(true);
    const [userData, setuserData] = useState<string>('');
    const [orderInp, setorderInp] = useState<orderInptype>({
        email: '',
        name: '',
        phone: 0,
        address: '',
        city: '',
        state: '',
        pincode: 0,
    })
    const [totalPrice, settotalPrice] = useState<number>(0)
    const searchParams = useSearchParams();
    const prodSearchParams = searchParams.get('product');

    useEffect(() => {

        const fetchCheckProdData = async (id: string) => {
            await fetch(`/api/product/checkout?product=${id}`, {
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        setcheckoutProd(res.result);
                        const totalSalePrice = res.result.reduce((acc: any, product: Product) => {
                            return acc + product.productSalePrice;
                        }, 0);
                        console.log(totalSalePrice)
                        settotalPrice(totalSalePrice);
                        setprodLoading(false);
                    }
                    if (res.status === 400) {

                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        if (prodSearchParams) {
            fetchCheckProdData(prodSearchParams);
        }

        // razorpay order created 
        // const createRazorpayOrder = async (price: number) => {

        //   await fetch('/api/razorpay/ordercreate', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       amount: price
        //     })
        //   }).then(res => res.json())
        //     .then(res => {
        //       console.log(res)
        //       if (res.status === 200) {
        //         setrazorOrderRes(res.result)
        //       }
        //     })
        //     .catch(err => {
        //       console.log(err);
        //     })
        // }

    }, [prodSearchParams])

    const oncheckout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const checkoutData = []
        for (let i = 0; i < checkoutProd.length; i++) {
            checkoutData.push({
                productname: checkoutProd[i].name,
                productId: checkoutProd[i]._id,
                productslug: checkoutProd[i].slug,
                productmodel: checkoutProd[i].model,
                productnormalprice: checkoutProd[i].productNormalPrice,
                productsaleprice: checkoutProd[i].productSalePrice,
            })
        }

        const orderData = {
            email: orderInp.email,
            name: orderInp.name,
            phone: orderInp.phone,
            address: orderInp.address,
            city: orderInp.city,
            state: orderInp.state,
            pincode: orderInp.pincode,
            orderprod: checkoutData,
            totalbill: totalPrice
        }
        console.log(orderInp, checkoutData)

        // order data save
        await fetch(`/api/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    toast.success(res.message);
                      createRazorpayOrder(res.result.totalbill);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    // razorpay order created 
    const createRazorpayOrder = async (price: number) => {

        await fetch('/api/razorpay/ordercreate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: price
            })
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    setrazorOrderRes(res.result)
                      razorpay(res.result._id);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const razorpay = (id: string) => {
        const options = {
            key: `${process.env.NEXT_PUBLIC_RAZORPAY_SECRET_ID}`,
            amount: razorOrderRes?.amount,
            currency: "INR",
            name: "SHOPSPPL",
            description: "SHOPSPPL product payment",
            image: `${process.env.NEXT_PUBLIC_BASE_URL}/img/logo.png`,
            order_id: razorOrderRes?.id,
            // callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay/paymentverification`,
            "handler": async function (response: any) {
                const resData = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    userid: id,
                }
                await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay/paymentverification`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(resData)
                }).then(res => res.json())
                    .then(res => {
                        console.log(res)
                        if (res.status === 200) {
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            prefill: {
                name: orderInp.name,
                email: orderInp.email,
                contact: "9000090000"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };
        console.log(options)
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }


    return (
        <main className='max-w-screen-xl mx-auto py-20'>
            <div className="flex gap-10">
                <div className="p-10 md:w-[65%] bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-xl shadow-xl">
                    <h2 className='font-semibold'>Checkout</h2>

                    <form onSubmit={oncheckout} className='front-form relative'>
                        <div className=''>
                            <h4>Billing Details</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" name='name' className="form-control" placeholder='Name'
                                        onChange={(e) => setorderInp({ ...orderInp, name: e.target.value })} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" name='email' className="form-control" placeholder='Email address'
                                        onChange={(e) => setorderInp({ ...orderInp, email: e.target.value })} />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" name='address' className="form-control" placeholder='Address'
                                    onChange={(e) => setorderInp({ ...orderInp, address: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" name='city' className="form-control" placeholder='City'
                                        onChange={(e) => setorderInp({ ...orderInp, city: e.target.value })} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input type="text" name='state' className="form-control" placeholder='state'
                                        onChange={(e) => setorderInp({ ...orderInp, state: e.target.value })} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="pincode" className="form-label">PIN Code</label>
                                    <input type="number" pattern="[0-9]{6}" maxLength={6} name='pincode' className="form-control" placeholder='pincode'
                                        onChange={(e) => setorderInp({ ...orderInp, pincode: parseInt(e.target.value) })} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="form-label">Phone No.</label>
                                    <input type="tel" pattern="[0-9]{10}" name='phone' className="form-control" placeholder='Phone No.'
                                        onChange={(e) => setorderInp({ ...orderInp, phone: parseInt(e.target.value) })} />
                                </div>
                            </div>



                        </div>
                        <button type='submit' className='btn-prim'>Order Now</button>
                    </form>
                </div>
                <div className="md:w-[35%] p-5 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-xl shadow-xl">
                    <h3>Choose Product</h3>
                    <ul>
                        {
                            prodLoading ?
                                <li className='animate-pulse flex gap-4' >
                                    <div className="prod-img w-[25%] h-[100px] rounded-lg overflow-hidden ">
                                        <div className='bg-gray-400 w-full h-full' />
                                    </div>
                                    <div className='text-sm w-[75%] space-y-2'>
                                        <div className="prod-name bg-gray-400 w-full h-2.5 rounded-md"></div>
                                        <div className="prod-name bg-gray-400 w-full h-2.5 rounded-md"></div>
                                        <div className="prod-name bg-gray-400 w-full h-2.5 rounded-md"></div>
                                        <div className="prod-Prrice mt-2 flex items-center gap-4">
                                            <span className="bg-gray-400 w-full h-2.5 rounded-md"></span>
                                            <span className="bg-gray-400 w-full h-2.5 rounded-md"></span></div>
                                    </div>
                                </li> :
                                checkoutProd && checkoutProd.map((item, index) => (
                                    <li key={index} className='border-b border-gray-400 last:border-0 flex gap-4' >
                                        <div className="prod-img w-[25%] h-[100px] rounded-lg overflow-hidden">
                                            <Image src={item.mainproductimg} alt={item.name} className='w-full ' width={100} height={100} />
                                        </div>
                                        <div className='text-sm w-[75%]'>
                                            <div className="prod-name">{item.name}</div>
                                            <div className="prod-Prrice mt-2">
                                                <span className="text-gray-900 font-medium leading-normal">₹{item?.productSalePrice} </span>
                                                <span className="line-through ps-2">₹{item?.productNormalPrice}</span></div>
                                        </div>
                                    </li>
                                ))
                        }

                    </ul>
                    <div className='total-product-price'>
                        <ul>
                            <li>
                                <div className="flex justify-between">
                                    <span>Total</span>
                                    <span>{totalPrice}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}
