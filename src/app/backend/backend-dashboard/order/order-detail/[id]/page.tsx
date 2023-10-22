"use client";

import { Product, orderInptype } from "@/helpers/interFace";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function OrderDetail({ params }: { params: { id: string } }) {

  const [orderListData, setorderListData] = useState<orderInptype>();
  const [loading, setloading] = useState(true);
  const [subTotal, setsubTotal] = useState<number>(0);

  useEffect(() => {
    const orderListFetch = async () => {
      await fetch(`/api/order/${params.id}`, {
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
  }, [params.id])
  return (
    <>
      <div>OrderDetail {params.id}</div>
      <div className="container mx-auto border border-gray-600 rounded-xl p-2.5">
        <div className="flex gap-[2%]">
          <div className="customer-billing-data w-[30%] p-1.5 border-r border-gray-600">
            <h3 className="mb-2.5 text-base" >Customer Billing Details</h3>
            <div className="text-[0.85rem] text-gray-400">
              <div className="mb-1.5">
                {orderListData?.name}<br />
                {orderListData?.address}<br />
                {orderListData?.city}<br />
                {orderListData?.state} {orderListData?.pincode}
              </div>

              <div className="mb-1.5">
                <strong>Email:</strong><br />
                {orderListData?.email}<br />
              </div>

              <div className="mb-1.5">
                <strong>Phone :</strong><br />
                {orderListData?.phone}<br />
              </div>
            </div>
          </div>
          {
            orderListData?.ship_add ?
              <div className="customer-shipping-data w-[30%] p-1.5 gap-[1%] border-r border-gray-600">
                <h3 className="mb-2.5 text-base" >Customer Shipping Details</h3>
                <div className="text-[0.85rem] text-gray-400">
                  <div className="mb-1.5">
                    {orderListData?.ship_address?.name}<br />
                    {orderListData?.ship_address?.address}<br />
                    {orderListData?.ship_address?.city}<br />
                    {orderListData?.ship_address?.state} {orderListData?.ship_address?.pincode}
                  </div>

                  <div className="mb-1.5">
                    <strong>Email:</strong><br />
                    {orderListData?.ship_address?.email}<br />
                  </div>

                  <div className="mb-1.5">
                    <strong>Phone :</strong><br />
                    {orderListData?.ship_address?.phone}<br />
                  </div>
                </div>
              </div> : null
          }

          <div className="customer-order  w-[30%] p-1.5">
            <h3 className="mb-2.5 text-base" >Order Details</h3>
            <ul className="text-[0.85rem] text-gray-400">
              <li>Order Status : <strong>{orderListData?.status}</strong></li>
              <li>Order ID : <strong>{orderListData?.sppl_orderid}</strong></li>
              <li>Razorpay Order ID : <strong>{orderListData?.orderid}</strong></li>
              <li>Razorpay Payment ID : <strong>{orderListData?.paymentid}</strong></li>
              <li>Payment DateTime : <strong>{orderListData?.paymentdate}</strong></li>
            </ul>
          </div>

        </div>


      </div>

      <div className="container mx-auto mt-5 p-2 rounded-lg">
       <div className="product-details">
       <h3 className="mb-2.5 text-base" >Order Product Details</h3>
       <table className="w-full table-fixed border-collapse border border-gray-500 " >
          <thead className="w-full text-xs text-gray-300 uppercase bg-gray-900">
            <tr className="w-full border-b border-gray-500 hover:bg-gray-800">
              <th className="w-[5%] p-3 border-r border-gray-500 last:border-none">Index</th>
              <th className="w-[50%] p-3 border-r border-gray-500 last:border-none">Item</th>
              <th className="w-[15%] p-3 border-r border-gray-500 last:border-none">Cost</th>
              <th className="w-[15%] p-3 border-r border-gray-500 last:border-none">Quantity</th>
              <th className="w-[15%] p-3 border-r border-gray-500 last:border-none">Total</th>
            </tr>
          </thead>
          <tbody>
            {
              orderListData?.orderprod?.map((item: any, index: number) => (
                <tr key={index} className="w-full border-b border-gray-500 hover:bg-gray-800 text-center">
                  <td className="w-[5%] p-3 border-r border-gray-500 last:border-none">{index + 1}</td>
                  <td className="w-[50%] p-3 border-r border-gray-500 last:border-none">{item?.productname}</td>
                  <td className="w-[15%] p-3 border-r border-gray-500 last:border-none">₹{item?.productsaleprice}</td>
                  <td className="w-[15%] p-3 border-r border-gray-500 last:border-none">× {item?.quantity}</td>
                  <td className="w-[15%] p-3 border-r border-gray-500 last:border-none">₹{item?.productsaleprice * item?.quantity}</td>
                </tr>
              ))
            }

          </tbody>
        </table>
        <div className="subtotal-part p-3">
          <ul className="flex justify-end">
            <li>SubItems Total : <strong>₹{subTotal}</strong></li>
          </ul>
        </div>
       </div>
      </div>
    </>
  )
}
