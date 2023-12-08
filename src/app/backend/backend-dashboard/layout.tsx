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
                <section className="w-screen h-screen flex">
                    <div className='w-80 p-2.5 flex-none'>
                        <div className='h-full rounded-2xl'>

                            <div className='w-full h-full'>
                                <DashNav />

                            </div>
                        </div>
                    </div>
                    <div className='flex-auto p-2.5'>
                        <div className=' h-full rounded-2xl p-4 bg-[#E5E7EB] bg-opacity-90 text-'>
                            <div className='w-full h-full overflow-x-hidden overflow-y-scroll rounded-2xl'>
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>



    )
}
