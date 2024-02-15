"use client";
import LoaderFront from '@/components/front/Loader';
import { useShoppingCart } from '@/hooks/ShoppingCartContext';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineClose } from "react-icons/ai";

interface buyBtn {
  id: string,
}
export default function OnBuyFunct({ id }: buyBtn) {
  const { buyFromCart, deliveryAvailab } = useShoppingCart();

  let [isOpen, setIsOpen] = useState(false)
  const [pincodeInp, setpincodeInp] = useState<string>('')
  const [loader, setloader] = useState<boolean>(false);
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const checkPinCodeAvailability = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloader(true);
    await fetch('/api/ekart/available/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pincode: pincodeInp }),
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          sessionStorage.setItem("deliveravle_pincode", "true");
          buyFromCart(id);
          setloader(false);

        }
        else if (res.status === 400) {
          toast.error(res.message);
          setloader(false);
        }
      })
      .catch(err => {
        console.log(err);
      })
    setloader(false);
  }


  return (
    <>
      <button onClick={() => {
        if(deliveryAvailab){
          buyFromCart(id)
        }
        else{
          openModal()
        }
      }} className="btn-prim ms-2">Buy Now</button>


      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                  {
                    loader ? <LoaderFront /> : null
                  }
                  <div className="modal-close-btn absolute bg-white rounded-full right-0 top-0 mt-1 me-1 w-6 h-6 cursor-pointer flex items-center justify-center" onClick={() => closeModal()}>
                    <AiOutlineClose className='w-5 h-5' />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-2.5"
                  >
                    Check Area Availability
                  </Dialog.Title>
                  <form onSubmit={checkPinCodeAvailability}>
                    <div className="w-full">
                      <div className="pincode-input front-form relative">
                        <div className="mb-3">
                          <input className="form-control" placeholder="Enter Pincode" type="text" name="pincode"
                            onChange={(e) => setpincodeInp(e.target.value)} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button type="submit" className="btn-prim">Check</button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </>

  )
}
