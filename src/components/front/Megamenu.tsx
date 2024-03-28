import { useState } from "react"
import { cateAcArr, cateCoolArr, cateTVArr, cateWashArr } from '@/helpers/CategoryData';
import { RightArrowCircleIcon } from "@/helpers/icon/Icons";
import Link from "next/link";

const megamenuData = [
    {
        id: 1,
        title: 'TELEVISIONS',
        img: '/img/category/tv/prod-3.png',
        viewalllink: '/product?category=Televisions',
        innerData: cateTVArr
    },
    {
        id: 2,
        title: 'WASHING MACHINE',
        img: '/img/category/wash/wash1.png',
        viewalllink: '/product?category=Washing+Machines',
        innerData: cateWashArr
    },
    {
        id: 3,
        title: 'COOLERS',
        img: '/img/category/cooler/cool-1.png',
        viewalllink: '/product?category=Cooler',
        innerData: cateCoolArr
    },
    {
        id: 4,
        title: 'AIR CONDITIONER',
        img: '/img/category/ac/ac-1.png',
        viewalllink: '/product?category=Air+Conditioners',
        innerData: cateAcArr
    }
]

export default function Megamenu() {
    const [activemmState, setactivemmState] = useState<number>();
    return (
        <div className='megamenu'>

            <div className="flex">
                <div className="category-list-part  w-[320px]">
                    {
                        megamenuData.map((item, index) => (
                            <div key={index}
                                onPointerEnter={() => {
                                    setactivemmState(item.id)
                                }}
                                className={`${(activemmState === item.id) ? 'bg-[#F6F6FB]' : null} cursor-pointer category-list w-full h-[100px] border border-[#98A2B3] border-collapse `}>
                                <div className="flex items-center ps-4 gap-4 h-full">
                                    <img src={item.img} alt={item.title} className='w-[100px] h-[70px] object-contain object-center' />
                                    <span className='text-lg text-black font-medium'>{item.title}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="category-data-part bg-[#F6F6FB] text-black flex-grow flex ">
                    <div className="w-[600px] ">
                        {
                            (!activemmState) ?

                                <div className="grid grid-cols-2">{
                                    megamenuData[0].innerData.map((item, index) => (
                                        <Link href={`${item.link}`} key={index} className={`md:px-4 px-3 md:py-2.5 py-5 border border-[#98A2B3] border-collapse flex flex-col justify-evenly gap-3 h-[200px]`}>

                                            <div className="flex items-center justify-between">
                                                <h5 className="md:text-base text-base font-medium">{item.title}</h5>
                                                <span className="md:w-auto w-[30%] flex items-end justify-end arrow-animation "><RightArrowCircleIcon width="20px" height="20px" color="#000" /></span>
                                            </div>
                                            <div className="cart-card-img">
                                                <img src={`${item.img}`} alt={`${item.title}`} className={`w-[170px] h-[130px] object-contain object-center mx-auto`} />
                                            </div>

                                        </Link>
                                    ))
                                }</div>
                                :
                                <div className="grid grid-cols-2">
                                    {
                                        megamenuData.map((item, index) => {
                                            if (activemmState === item.id) {
                                                return item.innerData.map((item, index) => (
                                                    <Link href={`${item.link}`} key={index} className={`md:px-4 px-3 md:py-2.5 py-5 border border-[#98A2B3] border-collapse flex flex-col justify-evenly gap-3 h-[200px]`}>
                                                        <div className="flex items-center justify-between">
                                                            <h5 className="md:text-base text-base font-medium">{item.title}</h5>
                                                            <span className="md:w-auto w-[30%] flex items-end justify-end arrow-animation "><RightArrowCircleIcon width="20px" height="20px" color="#000" /></span>
                                                        </div>
                                                        <div className="cart-card-img">
                                                            <img src={`${item.img}`} alt={`${item.title}`} className={`w-[170px] h-[130px] object-contain object-center mx-auto`} />
                                                        </div>

                                                    </Link>
                                                ))
                                            }
                                        })
                                    }
                                </div>
                        }
                    </div>
                    <div className="flex-grow p-5 flex items-center justify-center">
                        <div className="megamenu-viewall w-full h-[50px] bg-[#fff] border border-[#98A2B3]">

                            {
                                !activemmState ?

                                    <Link href={`/${megamenuData[0].viewalllink}`} className="flex items-center justify-between py-3 px-4">
                                        <span className="text-base font-medium">View All Product</span>
                                        <span className="md:w-auto w-[30%] flex items-end justify-end arrow-animation ">
                                            <RightArrowCircleIcon width="20px" height="20px" color="#000" />
                                        </span>
                                    </Link>

                                    :
                                    megamenuData.map((item, index) => {
                                        if (activemmState === item.id) {
                                            return (
                                                <Link href={`/${item.viewalllink}`} key={index} className="flex items-center justify-between py-3 px-4">
                                                    <span className="text-base font-medium">View All Product</span>
                                                    <span className="md:w-auto w-[30%] flex items-end justify-end arrow-animation ">
                                                        <RightArrowCircleIcon width="20px" height="20px" color="#000" />
                                                    </span>
                                                </Link>
                                            )
                                        }
                                    })

                            }
                        </div>
                    </div>

                </div>


            </div>

        </div>
    )
}
