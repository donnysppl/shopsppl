'use client';

import Image from "next/image";
import { useState } from "react";
import { Disclosure } from '@headlessui/react';
import { Transition } from '@headlessui/react'
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";

interface prodTabType {
    discription: any[],
    specification: any,
}

export default function ProdTabs({ discription, specification }: prodTabType) {
    const [activeTab, setActiveTab] = useState(0);
    const [prodSpecFull, setprodSpecFull] = useState<boolean>(false)
    const [specFull, setspecFull] = useState<boolean>(false)

    const tabs = [
        { title: 'Discription', content: discription },
        { title: 'Specification', content: specification },
    ];

    const renderTabs = () => {
        return tabs.map((tab, index) => (
            <li className={`${activeTab === index ? 'active' : null} cursor-pointer btn-prim`}
                key={index}
                onClick={() => setActiveTab(index)} >
                {tab.title}
            </li>
        ));
    };

    return (
        <>
            <section className="bg-black text-gray-100 py-4">
                <div className="container p-5 mx-auto">
                    {
                        discription ?
                            <div className="prod-spec mb-4">
                                <Disclosure defaultOpen as="div" className="border border-gray-400 p-6 rounded-xl bg-[#191919]">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="font-semibold text-xl w-full text-left">
                                                <div className="flex justify-between items-center">
                                                    <span>Product Showcase</span>
                                                    <span>
                                                        {open ? <AiOutlineMinus className="w-5 h-5" /> : <GoPlus className="w-5 h-5" /> } 
                                                    </span>
                                                </div>
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition-opacity duration-75"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="transition-opacity duration-150"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Disclosure.Panel className="mt-3">
                                                    <ul className={`${prodSpecFull ? 'h-auto' : 'h-[50vh]'} overflow-hidden mb-4 rounded-lg`}>
                                                        {discription.map((item, index) => (
                                                            <li key={index}>
                                                                <Image src={item} alt={item} width={1600} height={500} />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div className="sec-full-view flex justify-center">
                                                        <button onClick={(e) => setprodSpecFull(!prodSpecFull)} className="btn-prim">
                                                            {prodSpecFull ? "View Less" : "View More"}</button>
                                                    </div>
                                                </Disclosure.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Disclosure>
                            </div> : null
                    }

                    {
                        specification ?
                            <div className="spec">
                                <Disclosure as="div" className="border border-gray-400 p-6 rounded-xl bg-[#191919]">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="font-semibold text-xl w-full text-left">
                                                
                                                <div className="flex justify-between items-center">
                                                    <span>Specifications</span>
                                                    <span>
                                                        {open ? <AiOutlineMinus className="w-5 h-5" /> : <GoPlus className="w-5 h-5" /> } 
                                                    </span>
                                                </div>
                                            </Disclosure.Button>
                                            <Transition
                                                show={open}
                                                enter="transition-opacity duration-75"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="transition-opacity duration-150"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Disclosure.Panel className="mt-3">
                                                    <div className={`${specFull ? 'h-auto' : 'h-[50vh]'} tab-content-two specification text-gray-400`}>
                                                        <div dangerouslySetInnerHTML={{ __html: specification }} />
                                                    </div>
                                                    <div className="sec-full-view flex justify-center">
                                                        <button onClick={(e) => setspecFull(!specFull)} className="btn-prim">
                                                            {specFull ? "View Less" : "View More"}</button>
                                                    </div>
                                                </Disclosure.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                            : null
                    }

                </div>
            </section>
        </>
    )
}
