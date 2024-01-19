import CusDashNav from "@/components/front/customerdash/CusDashNav"
import FrontLayout from "@/components/layout/FrontLayout"
import { Toaster } from "react-hot-toast"

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <FrontLayout innercol="bg-gray-100">
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                />


                <main className="max-w-screen-2xl mx-auto flex sm:flex-nowrap flex-wrap gap-10 bg-white">
                    <div className="lg:w-1/4 md:w-1/3 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-xl ">
                        <div className="dashboard-nav-div p-6">
                            <ul>
                                <CusDashNav />
                            </ul>
                        </div>

                    </div>

                    <div className="lg:w-3/4 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-xl ">
                        {children}
                    </div>
                </main>


            </FrontLayout>
        </>
    )
}