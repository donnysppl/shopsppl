"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { GoDot } from "react-icons/go";
import { Disclosure, Transition } from '@headlessui/react';
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
import { AdminTokenDecode } from "@/helpers/interFace";

type Navlink = {
    innernavname: string;
    innernavlink: string;
};

type DashboardNavItem = {
    id: number;
    navhead: string;
    accessRole: string[];
    navlink: Navlink[];
};

type DashNavListType = DashboardNavItem[];

const dashNavList = [
    {
        id: 1,
        navhead: "Home",
        accessRole: ['Main Admin'],
        navlink: [
            {
                innernavname: "Home Data",
                innernavlink: "/backend/backend-dashboard/home"
            },

        ]
    },
    {
        id: 2,
        navhead: "Blog",
        accessRole: ['Post Admin', 'Main Admin'],
        navlink: [
            {
                innernavname: "Add Blog",
                innernavlink: "/backend/backend-dashboard/blogs/add"
            },
            {
                innernavname: "Blog List",
                innernavlink: "/backend/backend-dashboard/blogs/list"
            }
        ]
    },
    {
        id: 3,
        navhead: "Banner",
        accessRole: ['Post Admin', 'Main Admin'],
        navlink: [
            {
                innernavname: "Add Banner",
                innernavlink: "/backend/backend-dashboard/banner/add"
            },
            {
                innernavname: "Banner List",
                innernavlink: "/backend/backend-dashboard/banner/list"
            }
        ]
    },
    {
        id: 4,
        navhead: "Brand",
        accessRole: ['Post Admin', 'Main Admin'],
        navlink: [
            {
                innernavname: "Add Brand",
                innernavlink: "/backend/backend-dashboard/brand/add-brand"
            },
            {
                innernavname: "Brand List",
                innernavlink: "/backend/backend-dashboard/brand/brand-list"
            }
        ]
    },
    {
        id: 5,
        navhead: "Category",
        accessRole: ['Post Admin', 'Main Admin'],
        navlink: [
            {
                innernavname: "Add Category",
                innernavlink: "/backend/backend-dashboard/category/add-category"
            },
            {
                innernavname: "Category List",
                innernavlink: "/backend/backend-dashboard/category/list-category"
            }
        ]
    },
    {
        id: 6,
        navhead: "Product",
        accessRole: ['Post Admin', 'Main Admin'],
        navlink: [
            {
                innernavname: "Add Product",
                innernavlink: "/backend/backend-dashboard/product/add-product"
            },
            {
                innernavname: "Product List",
                innernavlink: "/backend/backend-dashboard/product/list-product"
            },
            {
                innernavname: "Coupon Add",
                innernavlink: "/backend/backend-dashboard/coupon/add"
            },
            {
                innernavname: "Coupon List",
                innernavlink: "/backend/backend-dashboard/coupon/list"
            }
        ]
    },
    {
        id: 7,
        navhead: "Order",
        accessRole: ['Post Admin', 'Main Admin'],
        navlink: [
            {
                innernavname: "Order List",
                innernavlink: "/backend/backend-dashboard/order/order-list"
            }
        ]
    },
    {
        id: 8,
        navhead: "Pages Data",
        accessRole: ['Post Admin', 'Main Admin'],
        navlink: [
            {
                innernavname: "Pages Add",
                innernavlink: "/backend/backend-dashboard/pages/pages-add"
            },
            {
                innernavname: "Pages List",
                innernavlink: "/backend/backend-dashboard/pages/pages-list"
            },
            {
                innernavname: "Custom Product Pages Add",
                innernavlink: "/backend/backend-dashboard/pages/custom-product/add"
            },
            {
                innernavname: "Custom Product Pages List",
                innernavlink: "/backend/backend-dashboard/pages/custom-product/list"
            }
        ]
    },
    {
        id: 9,
        navhead: "Contact Data",
        accessRole: ['Service Admin', 'Main Admin'],
        navlink: [
            {
                innernavname: "Contact Form List",
                innernavlink: "/backend/backend-dashboard/contact/list"
            }
        ]
    },
    {
        id: 10,
        navhead: "Admin",
        accessRole: ['Main Admin'],
        navlink: [
            {
                innernavname: "Add Admin",
                innernavlink: "/backend/backend-dashboard/admin/add"
            },
            {
                innernavname: "Admin List",
                innernavlink: "/backend/backend-dashboard/admin/list"
            }
        ]
    },

]


export default function DashNav() {

    const router = useRouter();
    const [adminRole, setadminRole] = useState<string>('');
    const [loader, setloader] = useState<boolean>(true);

    const [adminRoleArr, setadminRoleArr] = useState<DashNavListType>();

    useEffect(() => {
        setloader(true);
        const token = window?.localStorage.getItem('admin-token');
        const decodeToken = decode(token as string) as AdminTokenDecode | null;

        if (decodeToken && decodeToken.adminrole) {
            setadminRole(decodeToken.adminrole);
            const dashNavSort = dashNavList.filter(item => item.accessRole.includes(decodeToken.adminrole));
            setadminRoleArr(dashNavSort);
            setloader(false);
        }
        else{
            logout();
        }
    }, []);


    const logout = async () => {
        await fetch('/api/admin/logout', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    router.push("/backend/backend-login");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className="w-full">
            <div className="dashboard-nav-list">
                <div className="logo-part mb-5">
                    <h2 className="py-2 text-center font-bold border-b border-gray-700">SHOPSPPL</h2>
                </div>
                <div className="nav-scroll">
                    {
                        loader ?

                            [1, 2, 3, 4, 5, 6, 7, 8].map((item: any, index: number) => (
                                <div key={index} className="dash-nav-head relative overflow-hidden animate-pulse">
                                    <div className="dash-nav-head-link w-full bg-gray-500 h-[40px] mb-2 rounded-lg"></div>
                                </div>
                            ))

                            :
                            adminRoleArr && adminRoleArr.map((item, index) => (
                                <Disclosure as="div" key={item.id} className="dash-nav-head" >
                                    {({ open }) => (
                                        <>
                                            <div className={`dash-nav-head-link ${open ? 'active' : null}`}>
                                                <Disclosure.Button className="flex w-full items-center justify-between">
                                                    <span className="text-xs font-semibold uppercase tracking-wider">{item.navhead}</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <FiMinus className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <GoPlus className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                                <Transition
                                                    enter="transition duration-100 ease-out"
                                                    enterFrom="transform scale-90 opacity-0"
                                                    enterTo="transform scale-100 opacity-100"
                                                    leave="transition duration-75 ease-out"
                                                    leaveFrom="transform scale-100 opacity-100"
                                                    leaveTo="transform scale-90 opacity-0"
                                                >
                                                    <Disclosure.Panel className="pt-6">
                                                        {
                                                            item && item.navlink.map((item, index) => (
                                                                <Link key={index} className="dash-nav-list" href={item.innernavlink}>
                                                                    <span><GoDot /></span>
                                                                    <span className='text-xs font-semibold uppercase tracking-wider'>{item.innernavname}</span>
                                                                </Link>
                                                            ))
                                                        }
                                                    </Disclosure.Panel>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Disclosure>
                            ))
                    }
                    <div className="pb-1 mb-3">
                        <div className="space-y-1 flex flex-col mb-3 ">
                            {
                                loader ?
                                    <div className="dash-nav-head relative overflow-hidden animate-pulse">
                                        <div className="dash-nav-head-link w-full bg-gray-500 h-[40px] mb-2 rounded-lg"></div>
                                    </div>
                                    :
                                    <div className="dash-nav-list cursor-pointer" onClick={logout}>
                                        Logout
                                    </div>
                            }

                        </div>

                    </div>
                </div>



            </div>


        </div>

    )
}
