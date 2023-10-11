"use client";
import { useCallback, useMemo, useRef, useState } from "react"
import { BiChevronRight } from "react-icons/bi";

const cardJSON = [
    {
        subtitle: 'iphone 15 pro',
        title: 'Titanium',
        img: '/img/card-slider-demo/iphone15-pro.jpg'
    },
    {
        subtitle: 'iphone 15',
        title: 'Newphoria',
        img: '/img/card-slider-demo/iphone15.jpg'
    },
    {
        subtitle: 'apple watch',
        title: 'Smarter. Brighter. Mightier. ',
        img: '/img/card-slider-demo/watch.jpg'
    },
    {
        subtitle: 'apple watch ultra',
        title: 'Next-level adventure. ',
        img: '/img/card-slider-demo/watch-ultra.jpg'
    },
    {
        subtitle: 'airpods pro',
        title: 'Adaptive Audio. Now playing. ',
        img: '/img/card-slider-demo/airpods.jpg'
    },
    {
        subtitle: 'macbook air',
        title: 'Impressively big. Impossibly thin. ',
        img: '/img/card-slider-demo/macbook-air.jpg'
    },
    {
        subtitle: 'ipad air',
        title: 'Light. Bright. Full of might. ',
        img: '/img/card-slider-demo/ipad-air.jpg'
    }
]

const sliderCardWidth = 400;
const sliderCardMarg = 20;


const scrollToSlide = (slide: HTMLUListElement | null, slideIndex: Number) => {
    if (!slide) return;
    slide.scrollTo({
        left: slideIndex as number * (sliderCardWidth + sliderCardMarg),
        behavior: "smooth",
    })
}

export default function ScrollCard() {
    const slideRef = useRef<HTMLUListElement | null>(null);
    const [slidePosition, setslidePosition] = useState<number>(0);

    const currentSlide = useMemo(() => {
        return Math.floor(slidePosition / (sliderCardWidth + sliderCardMarg))
    }, [slidePosition])

    const scrolledToEndOfSlider = useMemo(() => {
        if (!slideRef.current) return false;
        return (
            slideRef.current.scrollWidth -
            slideRef.current.scrollLeft -
            slideRef.current.clientWidth ===
            0
        );
    }, [slidePosition]);

    const goTONextSlide = useCallback(() => {
        scrollToSlide(slideRef.current, currentSlide + 1)
    }, [currentSlide])
    const goTOPrevSlide = useCallback(() => {
        scrollToSlide(slideRef.current, currentSlide - 1)
    }, [currentSlide])
    return (
        <div className="bg-gray-200 min-h-screen font-sans py-16">
            <h2 className="font-semibold text-6xl text-center max-w-[800px] mx-auto mb-20">
                A magical connection to your devices.
            </h2>

            <ul ref={slideRef}
                onScroll={(e) => setslidePosition(e.currentTarget.scrollLeft)}
                className="flex h-[540px] pb-10 overflow-x-auto snap-x snap-mandatory slider-overflow">
                {cardJSON.map((item, index) => (
                    <li className="shrink-0  mr-5 last:mr-0 snap-start snap-always odd:text-gray-200 even:text-gray-900" key={index}>
                        <div className="slide-center shadow-md bg-white relative overflow-hidden w-[400px] h-[500px]  rounded-xl">
                            <div className="text-part absolute top-0 left-0 w-full p-6">
                                <div className="text-sm uppercase font-semibold text-balance mb-2">{item.subtitle}</div>
                                <div className="text-2xl font-bold">{item.title}</div>
                            </div>
                            <img src={item.img} alt={item.title} className="w-[400px] h-[500px]" />
                        </div>
                    </li>
                ))}
            </ul>
            <div className="slide-button flex gap-4 justify-center">
                <button onClick={() => goTOPrevSlide()}
                    disabled={currentSlide === 0}
                    className="disabled:opacity-40 border border-black rounded-full"
                ><BiChevronRight className="rotate-180 w-10 h-10"/></button>
                <button className="disabled:opacity-40 border border-black rounded-full " onClick={() => goTONextSlide()}
                    disabled={scrolledToEndOfSlider || currentSlide === cardJSON.length}
                ><BiChevronRight className=" w-10 h-10"/></button>
            </div>
        </div>
    )
}
