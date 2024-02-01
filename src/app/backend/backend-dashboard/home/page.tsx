'use client';

import { HomeCateSlider } from "@/helpers/interFace";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineMenu } from "react-icons/ai";

export default function HomeData() {

  const [catSliderData, setcatSliderData] = useState<HomeCateSlider[]>([]);
  const [loader, setloader] = useState<boolean>(false)
  const [cateSlideOption, setcateSlideOption] = useState<boolean>(false)

  useEffect(() => {
    setloader(true)
    const homeCateSliderFetch = async () => {
      await fetch('/api/cateslider', {
        method: 'GET',
        cache: 'no-cache',
      }).then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            toast.success(res.message);
            setcatSliderData(res.result);
          }
          else if (res.status === 400) {
            toast.error(res.message);
          }
          else if (res.status === 500) {
            toast.error(res.message);
          }
          setloader(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    homeCateSliderFetch();
  }, [])

  const homeCateSliderDelete = async (e: any, parentid: string, slideid: string) => {
    e.preventDefault();
    setloader(true);

    await fetch(`/api/cateslider?p_cateSlide=${parentid}&ch_cateSlide=${slideid}`, {
      method: 'DELETE',
      cache: 'no-cache',
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          window.location.reload();
          toast.success(res.message);
        }
        else if (res.status === 400) {
          toast.error(res.message);
        }
        else if (res.status === 500) {
          toast.error(res.message);
        }
        setloader(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className='inner-pages-base-div'>
      <div className="head">
        <h2 className='font-medium'>
          Home Data
        </h2>
      </div>

      <ul className="home-page-cate-slide">
        {
          loader ? "Loader ..." :
            catSliderData && catSliderData.map((item: HomeCateSlider, index: number) => (
              <li key={index}>
                <div>{item.category}</div>
                <ul className="grid grid-cols-4 gap-2">
                  {
                    item.categorySlider ?
                      item.categorySlider && item.categorySlider.map((itemb: any, ind: number) => (
                        <li key={ind} onMouseEnter={(e) => setcateSlideOption(true)} onMouseLeave={(e) => setcateSlideOption(false)}  >
                          <div className="relative">
                            {
                              cateSlideOption ?
                                <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center backdrop-brightness-50">
                                  <span className="text-base uppercase font-semibold">{itemb.slide}</span>
                                  <ul className="option-part rounded-md p-1 h-auto flex gap-2.5">
                                    <li className="flex items-center cursor-pointer gap-1.5 text-sm py-1 px-1.5 rounded-md border border-green-600 bg-green-600 "><FiEdit2 /> Edit</li>
                                    <li onClick={(e) => homeCateSliderDelete(e, item._id, itemb._id)} className="flex items-center gap-1.5 cursor-pointer text-sm py-1.5 px-1 rounded-md border border-red-600 bg-red-600 "><AiOutlineDelete /> Delete</li>
                                  </ul>
                                </div> : null
                            }

                            {/* <img src={itemb.file} alt={itemb.slide} /> */}
                          </div>
                        </li>
                      ))
                      : null
                  }
                </ul>
              </li>
            ))
        }
      </ul>


    </div>
  )
}
