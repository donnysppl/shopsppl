"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Product } from "@/helpers/interFace";
import toast from 'react-hot-toast';

interface orderInptype {
  email: string,
  name: string,
  phone: number,
  address: string,
  city: string,
  state: string,
  pincode: number,
}

export default function ProductCheckout() {

  const [checkoutProd, setcheckoutProd] = useState<Product[]>([]);
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
            const totalSalePrice = res.result.reduce((acc : any, product:Product) => {
              return acc + product.productSalePrice;
            }, 0);
            console.log(totalSalePrice)
            settotalPrice(totalSalePrice);
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
      totalbill:totalPrice
    }
    console.log(orderInp, checkoutData)
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
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <main className='max-w-screen-xl mx-auto py-20'>
      <div className="flex gap-10">
        <div className="pt-5 px-16 w-[65%] border border-gray-400">
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
        <div className="w-[35%] p-5  border border-gray-400">
          <h3>Choose Product</h3>
          <ul>
            {
              checkoutProd && checkoutProd.map((item, index) => (
                <li key={index} className='border-b border-gray-400 last:border-0 flex gap-4' >
                  <div className="prod-img w-[25%] h-[100px] rounded-lg overflow-hidden">
                    <img src={item.mainproductimg} alt={item.name} className='w-full ' />
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
