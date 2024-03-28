import { priceFormat } from "@/helpers/common"
import { RightArrowCircleIcon } from "@/helpers/icon/Icons"
import Image from "next/image"

export default function CategorySec({ fullbanner, fullMobbanner, sidebanner, cateArr, cardImgHeight, spacingbet, oppositecard, priceheading}: {
    fullbanner: String,
    fullMobbanner: String,
    sidebanner: String,
    cateArr: Array<{ title: String, link: String, img: String, price: number }>,
    cardImgHeight?: String,
    spacingbet?: String,
    oppositecard?: Boolean,
    priceheading: String, 
}) {

    return (
        <section className="">
            <div className="w-full mx-auto">
                <div className="category-full-banner md:block hidden ">
                    <Image unoptimized className="w-full h-[400px] object-center object-cover" src={`${fullbanner}`} width={1600} height={400} alt="category-full-banner"  
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw" />
                </div>
                <div className="category-full-banner md:hidden block">
                    <Image unoptimized src={`${fullMobbanner}`} width={700} height={600} alt="category-full-banner" />
                </div>
            </div>

            <div className="max-w-screen-2xl mx-auto flex md:px-2.5 md:flex-nowrap flex-wrap">
                <div className={`md:w-[50%] w-full bg-[F4F4F4] ${oppositecard ? 'order-2' : 'md:order-1 order-2'}`}>
                    <div className="grid grid-cols-2 ">
                        {
                            cateArr.map((item, index) => ( 
                                <div key={index} className={`md:px-4 px-3 md:py-7 py-5 border border-[98A2B3] border-collapse flex flex-col ${spacingbet ? spacingbet : 'space-y-8'}`}>
                                    <div className="flex items-center justify-between">
                                        <h5 className="md:text-xl text-base font-medium">{item.title}</h5>
                                        <span className="md:w-auto w-[30%] flex items-end justify-end arrow-animation "><RightArrowCircleIcon width="28px" height="28px" color="#000" /></span>
                                    </div>
                                    <div className="cart-card-img">
                                        <img src={`${item.img}`} alt={`${item.title}`} className={`${cardImgHeight ? cardImgHeight : null} mx-auto` } />
                                    </div>
                                    <div className="price md:text-lg text-sm underline text-center">{priceheading} <span className="font-semibold">{priceFormat(item.price)}</span></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={`md:w-[50%] w-full category-side-banner p-3 ${oppositecard ? 'order-1' : 'md:order-2 order-1'}`}>
                    <Image unoptimized src={`${sidebanner}`} width={800} height={800} alt="category-side-banner" />
                </div>
            </div>

        </section>
    )
}
