"use client";

import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function Product360({imgfilepath, imgformat, totalimg}:{imgfilepath:string, imgformat:string, totalimg:string}) {
    const [open3d, setopen3d] = useState<Boolean>(false)
    useEffect(() => {
        if (window && window.CI360) {
            window && window.CI360.init();
        }
    }, [open3d])

    return (
        <>
            <button onClick={() => setopen3d(!open3d)} className="view-3d-btn text-sm px-2 py-1 flex items-center justify-center border border-gray-950 rounded-full absolute top-1 right-1 cursor-pointer z-10 text-black bg-white">
                3D View
            </button>
            {
                open3d ?
                    <>
                        <div className="fixed inset-0 bg-black/25 z-10" />
                        <div className='threesix-product-outer relative'>
                            <div className="heading">
                                <h4 className="text-lg text-center font-semibold">3D Product View</h4>
                            </div>
                            <div className="modal-close-btn absolute top-2 right-2 bg-white rounded-full w-8 h-8 cursor-pointer flex items-center justify-center" onClick={() => setopen3d(!open3d)}>
                                <AiOutlineClose className='w-6 h-6' />
                            </div>
                            <div className="md:w-[500px] md:h-[500px] w-full h-full mx-auto flex items-center justify-center">
                                <div
                                    className="cloudimage-360"
                                    id="360Product"
                                    data-folder={`${imgfilepath}`}
                                    data-filename-x={`{index}.${imgformat}`}
                                    data-amount-x={`${totalimg}`}
                                    data-transformation="w=400&h=200&func=fit"
                                    data-speed="120"
                                    data-drag-speed="120"
                                    data-autoplay-reverse
                                    data-autoplay
                                ></div>
                            </div>

                        </div>
                    </> : null
            }
        </>
    )
}
