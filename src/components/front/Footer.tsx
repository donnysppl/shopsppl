import Link from 'next/link';
import React from 'react'
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const support = [
    {
        titlt: 'Return And Refund Policy',
        link: '/return-and-refund-policy',
    },
    {
        titlt: 'Shipping Policy',
        link: '/shipping-policy',
    },
    {
        titlt: 'Terms And Conditions',
        link: '/terms-and-conditions',
    },
    {
        titlt: 'Warranty Detials',
        link: '/warranty-detials',
    },
    {
        titlt: 'Privacy Policy',
        link: '/privacy-policy',
    },
    {
        titlt: 'FAQ',
        link: '/faq',
    },
]

const quick = [
    {
        titlt: 'Televisions',
        link: '/',
    },
    {
        titlt: 'Washing Machine',
        link: '/',
    },
    {
        titlt: 'Air Conditioner',
        link: '/',
    },
    {
        titlt: 'Coolers',
        link: '/warranty-detials',
    }
]

const social = [
    {
        titlt: 'Facebook',
        link: '/',
        icon: React.createElement(FaFacebook),
    },
    {
        titlt: 'Instagram',
        link: '/',
        icon: React.createElement(FaInstagram),
    },
    {
        titlt: 'Twitter',
        link: '/',
        icon: React.createElement(FaXTwitter),
    }
]

export default function Footer() {
    const date: Date = new Date();
    const year = date.getFullYear();

    return (
        <>
            <footer className="text-gray-100">
                <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">

                    <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
                        <div className="mx-auto max-w-sm lg:max-w-none">
                            <strong
                                className="block text-base font-bold "
                            >
                                Want us to email you with the latest blockbuster news?
                            </strong>
                            <form className="mt-6">
                                <div className="relative max-w-lg">
                                    <label className="sr-only" htmlFor="email"> Email </label>

                                    <input
                                        className="w-full rounded-full border-gray-200 bg-gray-100 p-4 pe-32 text-sm font-medium"
                                        id="email"
                                        type="email"
                                        placeholder="john@doe.com"
                                    />

                                    <button
                                        className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-act px-5 py-3 text-sm font-medium text-black transition hover:bg-prim hover:text-white"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                            <strong  className="block text-base font-bold mt-4" >
                                Follow Us On
                            </strong>
                            <div className="mt-2 flex justify-center gap-4 lg:justify-start">

                                {
                                    social.map((item, index) => (
                                        <a key={index}
                                            className="text-gray-300 transition hover:text-gray-200/75"
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

                        <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-2 lg:text-left" >

                            <div>
                                <strong className="font-bold text-gray-300"> About </strong>

                                <ul className="mt-6 space-y-1">

                                    {
                                        quick.map((item, index) => (
                                            <li key={index}>
                                                <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.link}`} className="text-gray-300 transition hover:text-gray-300/75">
                                                    {item.titlt}</Link>
                                            </li>
                                        ))
                                    }



                                </ul>
                            </div>

                            <div>
                                <strong className="font-bold text-gray-300"> Support </strong>
                                <ul className="mt-6 space-y-1">
                                    {
                                        support.map((item, index) => (
                                            <li key={index}>
                                                <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.link}`} className="text-gray-300 transition hover:text-gray-300/75">
                                                    {item.titlt}</Link>
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 border-t border-gray-100 pt-8">
                        <p className="text-center text-xs/relaxed text-gray-300">
                            © Company {year}. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}
