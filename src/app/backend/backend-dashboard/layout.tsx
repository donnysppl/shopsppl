// import DashNav from '@/components/DashNav';
import './dashboard.css';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';


const DashNav = dynamic(() => import('@/components/DashNav'))

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
        <Toaster position="bottom-center" reverseOrder={false} />
                <div className='backend-dashboard font-sans'>
                    <section className="w-screen h-screen">
                        <div className="w-72 border-r border-gray-500 p-4 fixed top-0 z-10 h-screen">
                            <DashNav />
                        </div>
                        <div className="right-part pl-72 overflow-y-scroll h-full">
                            <div className="dashboard-right-inner w-full">
                                <div className="mx-auto w-full p-5">
                                    {children}
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
        </>



    )
}
