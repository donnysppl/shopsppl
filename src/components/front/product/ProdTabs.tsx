'use client';

import Image from "next/image";
import { useState } from "react";

interface prodTabType {
    discription: any[],
    specification: any,
}

export default function ProdTabs({ discription, specification }: prodTabType) {
    const [activeTab, setActiveTab] = useState(0);
    console.log(activeTab)

    const tabs = [
        { title: 'Discription', content: discription },
        { title: 'Specification', content: specification },
    ];

    const renderTabs = () => {
        return tabs.map((tab, index) => (
            <li className={`${activeTab === index ? 'active' : null} cursor-pointer text-gray-100
            text-base py-2 px-4 rounded-full bg-yellow-300`}
                key={index}
                onClick={() => setActiveTab(index)} >
                {tab.title}
            </li>
        ));
    };

    return (
        <section className="bg-black">
            <div>
                <div className="tab-item-part">
                    <ul className="flex justify-center gap-5">
                        {renderTabs()}
                    </ul>
                </div>
                <div className="tab-item-content">
                    <div className="tab-content">
                        <ul>
                            {
                                (activeTab === 0) ?
                                    <li>
                                        <div className="tab-content-one">
                                            <ul>
                                                {discription.map((item, index) => (
                                                    <li key={index}>
                                                        <Image src={item} alt={item} width={1600} height={500} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                    :
                                    <li>

                                        <div className="tab-content-two">
                                            <div dangerouslySetInnerHTML={{ __html: specification }} />
                                        </div>
                                    </li>
                            }

                        </ul>

                    </div>
                </div>
            </div>
        </section>
    )
}
