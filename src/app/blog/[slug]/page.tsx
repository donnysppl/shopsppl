import FrontLayout from '@/components/layout/FrontLayout'
import React from 'react'

export default function BlogDetails({ params }: { params: { slug: string } }) {
    return (
        <FrontLayout innercol={'bg-white'}>
            <div className="blog-detail-data">
                <div className="main-img w-full h-[90vh] overflow-hidden relative">
                    <img className='w-full h-full object-cover object-center bg-overlay bg-blend-multiply'
                        src="https://assets-global.website-files.com/63c0810afc574dff4625bbd4/63c08718be56c34382b452cc_main_1.jpg"
                        alt="" />
                    <div className='absolute inset-0 font-bold text-white text-2xl backdrop-brightness-50
                     flex overflow-x-auto w-full h-full justify-center items-center flex-col'>
                        <div className="max-w-screen-2xl mx-auto py-2 px-4 row flex gap-2 justify-between flex-col">
                            <div className="w-1/2">
                                <h2 className='md:text-[2.5rem] text-base  font-semibold mb-2.5 leading-snug'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, ab.</h2>
                                <p className='md:text-base text-sm line-clamp-2 mb-2.5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perferendis inventore porro culpa, eligendi, ex quasi facere repellendus iure quibusdam soluta accusamus asperiores! Voluptatum et dolor maxime quis nemo amet.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8'>
                    <div className="mx-auto max-w-screen-md content-part">
                        <div className="rich-text w-richtext"><h2>The allure of off-the-beaten-path travel</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim <strong>lobortis scelerisque fermentum</strong> dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor.</p><figure className="w-richtext-figure-type-image w-richtext-align-fullwidth" ><div><img src="https://assets.website-files.com/64c2e60403eef3ab6fec4b53/64c9c2ccaee5d703372a6ba7_64c3eea874cb90183718fcf1_landscape-travel-image-journal-x-webflow-template.jpeg" loading="lazy" alt=""/></div><figcaption>Tempor orci dapibus ultrices in iaculis nunc sed augue lacus.</figcaption></figure><h3>Unveiling the charm of lesser-known Destinations</h3><p>Orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in <a href="/home-pages/home-v1">iaculis nunc sed augue lacus</a>.</p><ul role="list"><li>Lorem ipsum dolor sit amet consectetur facilisi etiam dignissim diam quis enim</li><li>Mauris aliquet faucibus iaculis dui vitae ullamco sit amet luctus</li><li>Posuere enim mi pharetra neque proin dic rhoncus dolor purus non enim</li><li>Dui faucibus in ornare posuere enim mi pharetra neque proin dicit</li></ul><h4>Finding solitude in hidden gem locations</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam <strong>dignissim diam</strong> quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices.</p><h5>The thrill of discovering untouched natural beauty</h5><p>Dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim <a href="/home-pages/home-v1">praesent elementum</a> facilisis leo, vel fringilla est ullamcorper eget nulla.</p><ol  role="list"><li>Lorem ipsum dolor sit amet consectetur tempor orci dapibus ultrices</li><li>Mauris aliquet faucibus iaculis dui vitae ullamco elementum facilisis</li><li>Posuere enim mi pharetra neque proin dic fermentum dui faucibus in ornare</li><li>Purus sit amet luctus posuere enim mi pharetra neque proin dic</li></ol><blockquote>“Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat uis aute irure dolor in reprehenderit in voluptate velit”</blockquote><h6>Exploring cultural marvels off the tourist radar</h6><p>Donsectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis <strong>mauris sit amet massa</strong> vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed.</p></div>
                    </div>
                </div>
            </div>
        </FrontLayout>
    )
}
