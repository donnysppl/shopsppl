import Link from 'next/link';
import React from 'react'
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Modal from './Modal';

const support = [
    {
        titlt: 'Return And Refund Policy',
        link: 'policy/return-and-refund-policy',
    },
    {
        titlt: 'Shipping Policy',
        link: 'policy/shipping-policy',
    },
    {
        titlt: 'Terms And Conditions',
        link: 'policy/terms-and-conditions',
    },
    {
        titlt: 'Warranty Detials',
        link: 'policy/warranty-detials',
    },
    {
        titlt: 'Privacy Policy',
        link: 'policy/privacy-policy',
    },
    {
        titlt: 'Track your order',
        link: 'policy/privacy-policy',
    },
    {
        titlt: 'Register a Complaint',
        link: 'policy/privacy-policy',
    },
    {
        titlt: 'Product Registration',
        link: 'policy/privacy-policy',
    },
    {
        titlt: 'FAQ',
        link: 'policy/faq',
    },
]

const quick = [
    {
        titlt: 'Televisions',
        link: '/product?category=Televisions',
    },
    {
        titlt: 'Washing Machine',
        link: '/product?category=Washing+Machines',
    },
    {
        titlt: 'Air Conditioner',
        link: '/product?category=Air+Conditioners',
    },
    {
        titlt: 'Coolers',
        link: '/product?category=Cooler',
    }
]

const social = [
    {
        titlt: 'Facebook',
        link: 'https://www.facebook.com/ShopSPPL/',
        icon: React.createElement(FaFacebook),
    },
    {
        titlt: 'Instagram',
        link: 'https://www.instagram.com/shopsppl/',
        icon: React.createElement(FaInstagram),
    },
    {
        titlt: 'Twitter',
        link: 'https://twitter.com/SPlastronics',
        icon: React.createElement(FaXTwitter),
    }
]

const aboutshopsppl = [
    {
        titlt: 'About us',
        link: '/',
    },
    {
        titlt: 'Blogs',
        link: '/',
    },
    {
        titlt: 'Support',
        link: '/',
    },
    {
        titlt: 'Product',
        link: '/',
    },
    {
        titlt: 'In The Press',
        link: '/',
    },
]

const shopcate = [
    {
        titlt: 'Shop HD TV',
        link: '/collections/shop-hd-tv',
    },
    {
        titlt: 'Shop Full HD TV',
        link: '/collections/shop-full-hd-tv',
    },
    {
        titlt: 'Shop 4K Android TV',
        link: '/collections/shop-4k-android-tv',
    },
    {
        titlt: 'Shop 4k Google TV',
        link: '/collections/shop-4k-google-tv',
    },
    {
        titlt: 'Shop QLED TV',
        link: '/collections/shop-qled-tv',
    },
    {
        titlt: 'Shop Semi Automatic Washing Machines',
        link: '/collections/shop-semi-automatic-washing-machines',
    },
    {
        titlt: 'Shop Top Load Fully Automatic Washing Machines',
        link: '/collections/shop-top-load-fully-automatic-washing-machines',
    },
    {
        titlt: 'Shop Front Load Fully Automatic Washing Machines',
        link: '/collections/shop-front-load-fully-automatic-washing-machines',
    },
    {
        titlt: 'Shop Air Conditioners',
        link: '/collections/shop-air-conditioners',
    },
    {
        titlt: 'Shop Air Coolers',
        link: '/collections/shop-air-coolers',
    },
]

const shopprice = [
    {
        titlt: 'Under 0 -10,000 ',
        link: '/collections/under-10000',
    },
    {
        titlt: 'between 10,000 -20,000',
        link: '/collections/between-10000-20000',
    },
    {
        titlt: 'Between 20,000 -30,000',
        link: '/collections/between-20000-30000',
    },
    {
        titlt: 'Between 30,000 -40,000',
        link: '/collections/between-30000-40000',
    },
    {
        titlt: 'Between 40,000 -50,000',
        link: '/collections/between-40000-50000',
    },
    {
        titlt: 'And 50,000 Above ',
        link: '/collections/between-50000-100000',
    },
]


export default function Footer() {
    const date: Date = new Date();
    const year = date.getFullYear();

    return (
        <>
            <footer className="text-gray-100">
                <div className="footerone pb-12">
                    <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-10">

                        <div className="flex justify-between gap-10 flex-wrap">
                            <div className="md:w-[30%] w-full">
                                <div className="footer-logo-par">
                                    <div className="logo">
                                        <Link href={'/'}>
                                            <img src="/img/logo.png" alt="Logo" className='w-48 mb-4' />
                                        </Link>
                                        <h2 className='font-medium text-white mb-2.5'>Subscribe to our email alerts!</h2>

                                        <div className="mb-6">
                                            <input type="email" name="subscribe"
                                                className='text-sm text-gray-900 placeholder::text-[#9F9F9F] bg-white rounded-xl py-5 px-5 w-full h-[45px]' placeholder='Enter your email address' />
                                        </div>

                                        <div className="follow">
                                            <div className='text-xl font-medium text-white' >Follow Us On</div>
                                            <div className="mt-2 flex gap-4 justify-start">

                                                {
                                                    social.map((item, index) => (
                                                        <a key={index}
                                                            className="text-gray-300 transition hover:text-gray-200/75 text-2xl"
                                                            href={item.link}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <span className="sr-only">{item.titlt}</span>

                                                            {item.icon}
                                                        </a>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="md:w-[60%] w-full">

                                <div className='flex md:flex-row flex-col justify-between flex-wrap gap-5'>

                                    <div className="shop-list ">

                                        <h4 className='md:text-xl text-base text-white font-medium mb-2.5'>Shop</h4>
                                        <div className='flex flex-col gap-2'>
                                            {
                                                quick.map((item, index) => (
                                                    <Link className='md:text-sm text-xs text-[#AFAFAF]' href={`${item.link}`} key={index}>{item.titlt}</Link>
                                                ))
                                            }
                                        </div>
                                    </div>


                                    <div className="shop-list">

                                        <h4 className='md:text-xl text-base text-white font-medium mb-2.5'>Support </h4>
                                        <div className='flex flex-col gap-2'>
                                            {
                                                support.map((item, index) => (
                                                    <Link className='md:text-sm text-xs text-[#AFAFAF]' href={`${item.link}`} key={index}>{item.titlt}</Link>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <div className="shop-list">

                                        <h4 className='md:text-xl text-base text-white font-medium mb-2.5'>About Shopsppl </h4>
                                        <div className='flex flex-col gap-2'>
                                            {
                                                aboutshopsppl.map((item, index) => (
                                                    <Link className='md:text-sm text-xs text-[#AFAFAF]' href={`${item.link}`} key={index}>{item.titlt}</Link>
                                                ))
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <div className='footertwo'>
                    <div className="mx-auto max-w-screen-2xl px-5 py-8  sm:px-6 lg:px-10">

                        <div className='flex justify-between flex-wrap gap-5 md:flex-row flex-col'>

                            <div className="shop-list">

                                <h4 className='md:text-xl text-base text-white font-medium mb-2.5'>Shop by Category</h4>
                                <div className='flex flex-col gap-2'>
                                    {
                                        shopcate.map((item, index) => (
                                            <Link className='md:text-sm text-xs text-[#AFAFAF]' href={`${item.link}`} key={index}>{item.titlt}</Link>
                                        ))
                                    }
                                </div>
                            </div>


                            <div className="shop-list">

                                <h4 className='md:text-xl text-base text-white font-medium mb-2.5'>Shop by Price</h4>
                                <div className='flex flex-col gap-2'>
                                    {
                                        shopprice .map((item, index) => (
                                            <Link className='md:text-sm text-xs text-[#AFAFAF]' href={`${item.link}`} key={index}>{item.titlt}</Link>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="shop-list">

                                <h4 className='md:text-xl text-base text-white font-medium mb-2.5'>Shop by latest launches</h4>
                                <div className='flex flex-col gap-2'>
                                    {
                                        quick.map((item, index) => (
                                            <Link className='md:text-sm text-xs text-[#AFAFAF]' href={`${item.link}`} key={index}>{item.titlt}</Link>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="shop-list">

                                <h4 className='md:text-xl text-base text-white font-medium mb-2.5'>Shop best Selling</h4>
                                <div className='flex flex-col gap-2'>
                                    {
                                        quick.map((item, index) => (
                                            <Link className='md:text-sm text-xs text-[#AFAFAF]' href={`${item.link}`} key={index}>{item.titlt}</Link>
                                        ))
                                    }
                                </div>
                            </div>         

                        </div>




                        <div className="md:mt-16 mt-10 border-t border-gray-100 pt-8">
                            <p className="text-center text-sm text-white">
                                © Company {year}. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>

            </footer>
            {/* <Modal /> */}
        </>
    )
}
