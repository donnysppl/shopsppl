"use client";
import React, { useEffect, useState } from 'react'
import { Product } from "@/helpers/interFace";
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useShoppingCart } from '@/hooks/ShoppingCartContext';
import { AiOutlineClose } from "react-icons/ai";


interface orderInptype {
    email: string,
    name: string,
    phone: number,
    address: string,
    city: string,
    state: string,
    pincode: number,
    companyname: string,
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


export default function Checkout() {

    const router = useRouter();

    const [checkoutProd, setcheckoutProd] = useState<Product[]>([]);
    const [razorOrderRes, setrazorOrderRes] = useState<RazorOrderes>();
    const [prodLoading, setprodLoading] = useState<boolean>(true);
    const [razorpayLoader, setrazorpayLoader] = useState<boolean>(false);
    const [userData, setuserData] = useState<string>('');
    const [orderInp, setorderInp] = useState<orderInptype>({
        email: '',
        name: '',
        phone: 0,
        address: '',
        city: '',
        state: '',
        pincode: 0,
        companyname: ''
    })
    const [shipAdd, setshipAdd] = useState<boolean>(false);
    const [orderShipInp, setorderShipInp] = useState<orderInptype>({
        email: '',
        name: '',
        phone: 0,
        address: '',
        city: '',
        state: '',
        pincode: 0,
        companyname: ''
    })

    const [totalPrice, settotalPrice] = useState<number>(0)

    const { cartItem,getItemQuantity,removeFromQuantity } = useShoppingCart();

    const prodID = cartItem.map(item => item.id).join(',');

    useEffect(() => {

        const fetchCheckProdData = async () => {
            await fetch(`/api/product/checkout?product=${prodID}`, {
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        setcheckoutProd(res.result);
                        const totalSalePrice = res.result.reduce((acc: any, product: Product) => {
                            const prodQuant = getItemQuantity(product._id)
                            return (acc + product.productSalePrice) * prodQuant;
                        }, 0);
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
        if (prodID) {
            fetchCheckProdData();
        }

    }, [prodID])

    const oncheckout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setrazorpayLoader(true);
        const checkoutData = []
        for (let i = 0; i < checkoutProd.length; i++) {
            const prodQuant = getItemQuantity(checkoutProd[i]._id)
            checkoutData.push({
                productname: checkoutProd[i].name,
                productId: checkoutProd[i]._id,
                productslug: checkoutProd[i].slug,
                productmodel: checkoutProd[i].model,
                productnormalprice: checkoutProd[i].productNormalPrice,
                productsaleprice: checkoutProd[i].productSalePrice,
                quantity:prodQuant,
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
            totalbill: totalPrice,
            companyname: orderInp.companyname,

            ship_add: shipAdd,

            ship_address: {
                email: orderShipInp.email,
                name: orderShipInp.name,
                phone: orderShipInp.phone,
                address: orderShipInp.address,
                city: orderShipInp.city,
                state: orderShipInp.state,
                pincode: orderShipInp.pincode,
                companyname: orderShipInp.companyname,
            }
        }
        console.log(orderData)

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
                    setuserData(res.result._id)
                    if (res.result.totalbill) {
                        createRazorpayOrder(res.result.totalbill, res.result._id);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    // razorpay order created 
    const createRazorpayOrder = async (price: number, id: string) => {

        if (price) {
            console.log(price)
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
                        if (res.result) {
                            razorpay(res.result, id);
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const razorpay = (res: RazorOrderes, orderid: string) => {
        const options = {
            key: `${process.env.NEXT_PUBLIC_RAZORPAY_SECRET_ID}`,
            amount: res.amount,
            currency: "INR",
            name: "SHOPSPPL",
            description: "SHOPSPPL product payment",
            image: `${process.env.NEXT_PUBLIC_BASE_URL}/img/logo.png`,
            order_id: res.id,
            // callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay/paymentverification`,
            // userid is a order id
            "handler": async function (response: any) {
                const resData = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    userid: orderid,
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
                            setrazorpayLoader(false);
                            router.push(`/product/checkout/thankyou?reference=${res.razorpay_payment_id}`)
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
            {
                razorpayLoader ?
                    <div className="razor-loader bg-gray-900 bg-opacity-25 w-screen h-full absolute inset-0
                z-10 flex items-center justify-center">
                        <div className="spinner"></div>
                    </div> : null
            }
            <div className="flex gap-10">
                <div className="p-10 md:w-[65%] bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-xl shadow-xl">
                    <h2 className='font-semibold mb-3'>Checkout</h2>

                    <form onSubmit={oncheckout} className='front-form relative'>
                        <div className=''>
                            <h4 className='mb-1.5'>Billing Details</h4>
                            <div className="grid grid-cols-2 gap-x-4">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" name='name' className="form-control" placeholder='Name'
                                        onChange={(e) => setorderInp({ ...orderInp, name: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" name='email' className="form-control" placeholder='Email address'
                                        onChange={(e) => setorderInp({ ...orderInp, email: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone No.</label>
                                    <input type="tel" pattern="[0-9]{10}" name='phone' className="form-control" placeholder='Phone No.'
                                        onChange={(e) => setorderInp({ ...orderInp, phone: parseInt(e.target.value) })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" name='address' className="form-control" placeholder='Address'
                                        onChange={(e) => setorderInp({ ...orderInp, address: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="companyname" className="form-label">Company name (optional)</label>
                                    <input type="text" name='companyname' className="form-control" placeholder='Company name (optional)'
                                        onChange={(e) => setorderInp({ ...orderInp, companyname: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" name='city' className="form-control" placeholder='City'
                                        onChange={(e) => setorderInp({ ...orderInp, city: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input type="text" name='state' className="form-control" placeholder='state'
                                        onChange={(e) => setorderInp({ ...orderInp, state: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pincode" className="form-label">PIN Code</label>
                                    <input type="number" pattern="[0-9]{6}" maxLength={6} name='pincode' className="form-control" placeholder='pincode'
                                        onChange={(e) => setorderInp({ ...orderInp, pincode: parseInt(e.target.value) })} />
                                </div>

                            </div>

                            <div className="check-shipping-add">
                                <div className="mb-3">
                                    <input className="form-check-input me-1.5" name='shipment' type="checkbox" id="shipment" value={shipAdd ? 'checked' : ''} onChange={(e) => setshipAdd(e.target.checked)} />
                                    <label className="form-label" htmlFor="shipment">
                                        Ship to a different address?
                                    </label>
                                </div>
                            </div>

                            {
                                shipAdd ?
                                    <div className="grid grid-cols-2 gap-x-4">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" name='name' className="form-control" placeholder='Name'
                                                onChange={(e) => setorderShipInp({ ...orderShipInp, name: e.target.value })} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <input type="email" name='email' className="form-control" placeholder='Email address'
                                                onChange={(e) => setorderShipInp({ ...orderShipInp, email: e.target.value })} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="form-label">Phone No.</label>
                                            <input type="tel" pattern="[0-9]{10}" name='phone' className="form-control" placeholder='Phone No.'
                                                onChange={(e) => setorderShipInp({ ...orderShipInp, phone: parseInt(e.target.value) })} />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="address" className="form-label">Address</label>
                                            <input type="text" name='address' className="form-control" placeholder='Address'
                                                onChange={(e) => setorderShipInp({ ...orderShipInp, address: e.target.value })} />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="companyname" className="form-label">Company name (optional)</label>
                                            <input type="text" name='companyname' className="form-control" placeholder='Company name (optional)'
                                                onChange={(e) => setorderShipInp({ ...orderShipInp, companyname: e.target.value })} />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <input type="text" name='city' className="form-control" placeholder='City'
                                                onChange={(e) => setorderShipInp({ ...orderShipInp, city: e.target.value })} />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="state" className="form-label">State</label>
                                            <input type="text" name='state' className="form-control" placeholder='state'
                                                onChange={(e) => setorderShipInp({ ...orderShipInp, state: e.target.value })} />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="pincode" className="form-label">PIN Code</label>
                                            <input type="number" pattern="[0-9]{6}" maxLength={6} name='pincode' className="form-control" placeholder='pincode'
                                                onChange={(e) => setorderShipInp({ ...orderShipInp, pincode: parseInt(e.target.value) })} />
                                        </div>

                                    </div> : null
                            }




                        </div>
                        <button type='submit' className='btn-prim'>Order Now</button>
                    </form>
                </div>
                <div className="md:w-[35%] p-5 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-xl shadow-xl">
                    <h3 className='mb-2.5'>Choose Product</h3>
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
                                    <li key={index} className="">
                                        <div className='cart-product flex gap-2.5 border border-gray-400 mb-2.5 rounded-xl overflow-hidden'>
                                            <Image src={item.mainproductimg} width={100} height={100} alt={item.name} />
                                            <div className="prod-data p-1.5">
                                                <div className="name text-[0.8rem] line-clamp-2">
                                                    {item.name}</div>
                                                <div className="inline-flex gap-2 items-center text-[0.8rem]">
                                                    {getItemQuantity(item._id)} <AiOutlineClose /> ₹ {item.productSalePrice}</div>
                                                <div className="remove-btn flex justify-end"><button onClick={() => removeFromQuantity(item._id)} className="btn-prim scale-75">Remove</button></div>
                                            </div>
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
                                    <span>₹ {totalPrice}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}
