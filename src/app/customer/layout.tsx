import CustomerProv from "@/components/front/CustomerProv"
import FrontLayout from "@/components/layout/FrontLayout"
import { Toaster } from "react-hot-toast"

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode
}) {


    return (
        <FrontLayout innercol={'bg-gray-100'}>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <CustomerProv>{children}</CustomerProv>
        </FrontLayout>
    )
}