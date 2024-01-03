"use client";
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Toaster } from "react-hot-toast"

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode
}) {



    return (
        <GoogleOAuthProvider clientId="605622970388-jos89fmacattlrgj1pu7ultb95beiu1s.apps.googleusercontent.com">
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            {children}
        </GoogleOAuthProvider>

    )
}