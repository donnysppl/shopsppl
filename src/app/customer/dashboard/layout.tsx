import CusDashNav from "@/components/front/customerdash/CusDashNav"
import FrontLayout from "@/components/layout/FrontLayout"
import { Toaster } from "react-hot-toast"
import { BiSolidUserCircle } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <main className="max-w-screen-2xl px-5 py-20 mx-auto flex sm:flex-nowrap flex-wrap gap-10">
                <div className="lg:w-1/4 md:w-1/3 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-xl shadow-xl">
                    <div className="dashboard-nav p-6">
                        <div className="usericon">
                            <BiSolidUserCircle className='w-[75px] h-[75px] rounded-full opacity-70' />

                            <ul className='pb-4 mb-3 border-b border-gray-300'>
                                <li>Customer name</li>
                                <li>Customer email</li>
                            </ul>
                        </div>
                        <ul>
                            <CusDashNav />
                            <li className='flex font-medium items-center gap-3 py-2 px-2 hover:bg-gray-100 active:bg-gray-100 rounded-lg' ><LuLogOut /> Logout</li>
                        </ul>
                    </div>

                </div>

                <div className="lg:w-3/4 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-xl shadow-xl">
                    {children}
                </div>

            </main>
        </>
    )
}