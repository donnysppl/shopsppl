'use client';

import { orderInptype } from "@/helpers/interFace";
import { decode } from "jsonwebtoken";
import { useEffect, useState } from "react";
import moment from 'moment';
// import Invoice from "@/components/front/product/invoice/Invoice";
import Link from "next/link";

type DecodeToken = {
  id: string | undefined;
}

// const RenderInvoice = (data:orderInptype) => {

//   const [toggle, settoggle] = useState(false);
  
//   return (
//     <>
//       <button onClick={() => settoggle(!toggle)} className="btn-prim">Invoice</button>

//       {
//         toggle ?
//           <>
//             <div className="fixed w-screen h-full top-0 left-0 z-10">
//               <Invoice {...data} />
//             </div>
//           </> : null

//       }
//     </>

//   )
// }


export default function CustomerOrder() {



  const [userOrderList, setuserOrderList] = useState<orderInptype[]>([]);
  const [userOrderArr, setuserOrderArr] = useState();
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    const token = window?.localStorage.getItem('customer-admin');
    const decodeToken = decode(token as string) as DecodeToken | null;
    const decodeID: string | undefined = decodeToken?.id;
    const userOrderData = async () => {
      setloading(true)
      await fetch(`/api/order/user/${decodeID}`, {
        method: 'GET',
        cache: 'no-store',
      }).then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            setuserOrderList(res.result);
            setuserOrderArr(res.result.orderprod);
            setloading(false)
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
    userOrderData();
  }, [])


  return (
    <>

      <div className="order-table">
        <h2 className="font-medium mb-2.5 text-2xl" >Order List</h2>

        <div className="relative overflow-x-auto">
          {
            loading ? 'loading...' :
              <table className="w-full text-sm text-left text-gray-500 bg-gray-50">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userOrderList && userOrderList.map((item: any, index: number) => (
                      <tr key={index} className="bg-white border-b text-[0.8rem]">
                        <td className="px-6 py-3">
                          {item.sppl_orderid}
                        </td>
                        <td className="px-6 py-3">
                          Order : {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}<br />
                          Payment : {moment(item.paymentdate).format('MMMM Do YYYY, h:mm:ss a')}
                        </td>
                        <td className="px-6 py-3">
                          {item.status}
                        </td>
                        <td className="px-6 py-3">
                          ₹{item.totalbill} For {item.orderprod.reduce((acc: any, product: any) => {
                            return (acc + product.quantity);
                          }, 0)} item
                        </td>
                        <td className="px-6 py-3">
                          {
                            (item.status === 'payment completed') ?
                              // <RenderInvoice {...item} /> 
                              <Link target="_blank" href={`/customer/invoice?custID=${item.customerid}&ordID=${item._id}`}>Invoice</Link>
                              : null

                          }
                        </td>
                      </tr>
                    ))
                  }

                </tbody>
              </table>
          }
        </div>


      </div>
    </>
  )
}
