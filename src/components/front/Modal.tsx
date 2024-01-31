"use client";
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image';
import { Fragment, useState } from 'react'
import ContactForm from './form/ContactForm';
import { AiOutlineClose } from "react-icons/ai";

export default function Modal() {
  let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
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
            <div className="flex max-w-3xl mx-auto min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-[400px] relative transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all flex">
                  <div className="modal-close-btn absolute bg-white rounded-full right-0 w-6 h-6 mt-1 me-1 cursor-pointer flex items-center justify-center" onClick={() => closeModal()}>
                    <AiOutlineClose className='w-5 h-5' />
                  </div>
                  <div className="w-[50%] h-full">
                    <div className="modal-left-part h-full">
                      <img src="/img/modal.webp" alt="modal.webp" className='w-full h-full object-cover object-center' />
                    </div>
                  </div>
                  <div className="w-[50%] h-full">
                    <div className="modal-right-part w-full h-full">
                      <div className='p-3'>
                        <h2 className='text-center mb-0.5 mt-1'>Grab the offer</h2>
                        <div className='scale-[0.88]'>
                          <ContactForm type={'modal'} />
                        </div>
                      </div>
                    </div>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
