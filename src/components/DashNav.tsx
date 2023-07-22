"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';

const dashNavList = [
    {
        navhead: "Banner",
        navlink: [
            {
                innernavname: "Add Banner",
                innernavlink: "./banner/add"
            },
            {
                innernavname: "Banner List",
                innernavlink: "./banner/list"
            }
        ]
    },
    {
        navhead: "Brand",
        navlink: [
            {
                innernavname: "Add Brand",
                innernavlink: "/backend-dashboard/brand/add-brand"
            },
            {
                innernavname: "Brand List",
                innernavlink: "/backend-dashboard/brand/brand-list"
            }
        ]
    },
    {
        navhead: "Category",
        navlink: [
            {
                innernavname: "Add Category",
                innernavlink: "/backend-dashboard/category/add-category"
            },
            {
                innernavname: "Category List",
                innernavlink: "/backend-dashboard/category/list-category"
            }
        ]
    },
    {
        navhead: "Product",
        navlink: [
            {
                innernavname: "Add Product",
                innernavlink: "./product/add"
            },
            {
                innernavname: "Product List",
                innernavlink: "./product/list"
            }
        ]
    },
    {
        navhead: "Order",
        navlink: [
            {
                innernavname: "Order List",
                innernavlink: "./order"
            }
        ]
    },
    {
        navhead: "Order",
        navlink: [
            {
                innernavname: "Order List",
                innernavlink: "./order"
            }
        ]
    },
    {
        navhead: "Order",
        navlink: [
            {
                innernavname: "Order List",
                innernavlink: "./order"
            }
        ]
    }
]

export default function DashNav() {

    const router = useRouter();

    const logout = async () => {
        await fetch('/api/admin/logout', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    router.push("/backend-login");
                }
                else if (res.status === 400) {

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
                        dashNavList && dashNavList.map((item, index) => (
                            <div key={index} className="pb-1 mb-3 border-b border-gray-600">
                                <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400/80">
                                    {item.navhead}
                                </div>
                                <div className="space-y-1 flex flex-col mb-3 ">
                                    {
                                        item && item.navlink.map((item, index) => (
                                            <Link key={index} className="dash-nav-list" href={item.innernavlink}>{item.innernavname}</Link>
                                        ))
                                    }
                                </div>

                            </div>
                        ))
                    }
                    <div className="pb-1 mb-3">
                        <div className="space-y-1 flex flex-col mb-3 ">
                            <div className="dash-nav-list cursor-pointer" onClick={logout}>
                                Logout
                            </div>
                        </div>

                    </div>
                </div>



            </div>
        </div>
    )
}
