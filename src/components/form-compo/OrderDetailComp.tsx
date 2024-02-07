"use client";

import { priceFormat } from "@/helpers/common";
import { Product, orderInptype } from "@/helpers/interFace";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import Loader from "../Loader";



export default function OrderDetailComp({ id }: { id: string }) {
  const [orderListData, setorderListData] = useState<orderInptype>();
  const [loading, setloading] = useState(true);
  const [subTotal, setsubTotal] = useState<number>(0);

  useEffect(() => {

    const orderListFetch = async () => {

      await fetch(`/api/order/${id}`, {
        method: 'GET',
        cache: 'no-store',
      }).then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            toast.success(res.message);
            setorderListData(res.result);
            if (res.result.orderprod) {
              const prodData = res.result.orderprod;
              const subTotoal = prodData.reduce((acc: any, product: any) => {
                return (acc + product.productsaleprice) * product.quantity;
              }, 0);
              setsubTotal(subTotoal);
            }
          }
          else if (res.status === 400) {
            toast.error(res.message);
          }
          else if (res.status === 500) {
            toast.error(res.message);
          }
          setloading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    orderListFetch();
  }, [id])
  const trackinh = orderListData?.ekartData[0]
  console.log(orderListData?.ekartData[0])

  return (
    <div className="relative text-gray-950">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-950 font-semibold mb-2.5">ORDER DETAILS</h2>

        <div className="mb-2">

        </div>

      </div>

      {
        loading ? "Loading......" :
          <div className="container text-gray-950 grid grid-cols-4 gap-5">

            {/* Logistics  details */}
            {
              (orderListData?.ekartData?.length !== 0) ?
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="cust-head border-b border-gray-400 p-3">
                    <h5 className="text-lg font-semibold">Logistics  Details</h5>
                  </div>
                  <div className="cust-card-body p-3">
                    <ul className="flex gap-4 flex-col mb-2">
                      <li className="flex justify-center">
                        <img src="/img/logistics.gif" alt="logistics" className="w-24 h-24" />
                      </li>
                      {/* <li className="text-center text-sm">Tracking ID : <strong>{orderListData?.ekartData[0].trackingID}</strong> */}
                      <li className="text-center text-sm">Tracking ID : <strong>
                        { Array.isArray(orderListData?.ekartData[0]) ?
                          orderListData?.ekartData[0].map((item, index) => (
                            <span className="block" key={index}>{item.trackingid},</span>
                          )) : orderListData?.ekartData[0].trackingID
                        }
                      </strong>
                      </li>
                    </ul>
                  </div>

                </div> : null
            }

            {/* customer details */}
            <div className="bg-white rounded-lg shadow-sm ">

              <div className="cust-head border-b border-gray-400 p-3">
                <h5 className="text-lg font-semibold">Customer Details</h5>
              </div>
              <div className="cust-card-body p-3">
                <ul className="flex gap-4 flex-col">
                  <li>
                    <div className="user-name-icon flex gap-3 items-center">
                      <FaUser className="w-10 h-10 p-1.5 border border-gray-400 rounded-lg" />
                      <div className="cust-name">
                        <div className="font-semibold">{orderListData?.name}</div>
                        <div className="text-sm text-gray-500">Customer</div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex gap-2 items-center ps-2.5">
                      <CiMail className="w-6 h-6" /> <span>{orderListData?.email}</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex gap-2 items-center ps-2.5">
                      <IoCallOutline className="w-6 h-6" /> <span>{orderListData?.phone}</span>
                    </div>
                  </li>
                </ul>
              </div>

            </div>

            {/*  Billing Address details */}
            <div className="bg-white rounded-lg shadow-sm">

              <div className="cust-head border-b border-gray-400 p-3">
                <h5 className="text-lg font-semibold">Billing Address</h5>
              </div>
              <div className="cust-card-body p-4">
                <ul className="flex gap-0.5 flex-col text-base">
                  <li>Address : <strong>{orderListData?.address}</strong> </li>
                  <li>City : <strong>{orderListData?.city}</strong> </li>
                  <li>State : <strong>{orderListData?.state}</strong> </li>
                  <li>Pincode : <strong>{orderListData?.pincode}</strong> </li>
                </ul>
              </div>

            </div>

            {/*  Shipping  Address details */}
            {
              orderListData?.ship_add ?
                <div className="bg-white rounded-lg shadow-sm ">

                  <div className="cust-head border-b border-gray-400 p-3">
                    <h5 className="text-lg font-semibold">Shipping Address</h5>
                  </div>
                  <div className="cust-card-body p-4">
                    <ul className="flex gap-0.5 flex-col text-base font-medium">
                      <li> {orderListData?.ship_address?.name} </li>
                      <li> {orderListData?.ship_address?.address} </li>
                      <li> {orderListData?.ship_address?.city} </li>
                      <li> {orderListData?.ship_address?.state} </li>
                      <li> {orderListData?.ship_address?.pincode} </li>
                    </ul>
                  </div>

                </div> : null
            }

            {/*  Payment  Address details */}
            <div className="bg-white rounded-lg shadow-sm">

              <div className="cust-head border-b border-gray-400 p-3">
                <h5 className="text-lg font-semibold">Payment Details</h5>
              </div>
              <div className="cust-card-body p-4">
                <ul className="flex gap-0.5 flex-col text-base">
                  <li>Order Status : <strong>{orderListData?.status}</strong></li>
                  <li>Order ID : <strong>{orderListData?.sppl_orderid}</strong></li>
                  <li>Razorpay Order ID : <strong>{orderListData?.orderid}</strong></li>
                  <li>Razorpay Payment ID : <strong>{orderListData?.paymentid}</strong></li>
                  <li>Payment DateTime : <strong>{orderListData?.paymentdate}</strong></li>
                </ul>
              </div>

            </div>


            {/* Order detail left product table */}
            <div className="col-span-4">

              {/* Order detail product table */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-2.5 text-base font-semibold">
                  Order #{orderListData?.sppl_orderid}
                </div>
                <table className="w-full table-fixed " >
                  <thead className="w-full text-xs text-gray-600 uppercase bg-[#E5E7EB]">
                    <tr className="w-full ">
                      <th className=" p-3  last:border-none">Index</th>
                      <th className="w-[50%] p-3  last:border-none">Item</th>
                      <th className=" p-3  last:border-none">Cost</th>
                      <th className=" p-3  last:border-none">Quantity</th>
                      <th className=" p-3  last:border-none">Total</th>
                    </tr>
                  </thead>
                  <tbody className="border-b border-gray-500">
                    {
                      orderListData?.orderprod?.map((item: any, index: number) => (
                        <tr key={index} className="w-full  hover:bg-gray-200 text-center border-b border-gray-400">
                          <td className=" p-3  last:border-none">{index + 1}</td>
                          <td className="w-[50%] p-3  last:border-none">{item?.productname}</td>
                          <td className=" p-3  last:border-none">{priceFormat(item?.productsaleprice)}</td>
                          <td className=" p-3  last:border-none">× {item?.quantity}</td>
                          <td className=" p-3  last:border-none">{priceFormat(item?.productsaleprice * item?.quantity)}</td>
                        </tr>
                      ))
                    }

                  </tbody>
                </table>
                <div className="subtotal-part p-3">
                  <ul className="flex justify-end flex-col items-end">
                    <li>SubItems Total : <strong>{priceFormat(subTotal)}</strong></li>
                    {
                      (orderListData?.coupon !== '') ?
                        <>
                          <li className="border-b border-gray-300">Coupon Discount ({orderListData?.coupon}) :
                            <strong>₹{(orderListData?.discountammount !== 0) ? orderListData?.discountammount : 0}</strong></li>
                          <li className="">Total Price (after discount) : <strong>₹{orderListData?.totalbill}</strong></li>
                        </>
                        : null
                    }

                  </ul>
                </div>
              </div>

            </div>

          </div>
      }





    </div>
  )
}
