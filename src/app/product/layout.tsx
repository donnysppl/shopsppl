
import FrontLayout from "@/components/layout/FrontLayout"
import { Toaster } from "react-hot-toast"

export default function ProductLayout({
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
            {children}
        </FrontLayout>
    )
}