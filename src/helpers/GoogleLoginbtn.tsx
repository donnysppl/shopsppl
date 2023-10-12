"use client"
import { useEffect, useRef, useState } from "react";

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { decode } from "jsonwebtoken";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

declare global {
    interface Window {
        google: any;
    }
}

interface GoogleRes {
    credential: string;
}

interface DecodeGooGle {
    name: string;
    email: string;
}

export default function GoogleLoginbtn() {

    const router = useRouter();
    const [divWidth, setDivWidth] = useState<number>(0);

    useEffect(() => {
        const div = window.document.getElementsByClassName('outerdivGoo')[0] as HTMLDivElement;
        const width = div?.offsetWidth;
        if (width) {
            setDivWidth(width);
            console.log(width)
        }
    }, []);


    const onGoogleLoginFct = async ({ name, email }: DecodeGooGle) => {
        await fetch('/api/customeruser/googlelogin',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username:name,email:email
              })
        }).then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            const custToken = window.localStorage.getItem("customer-admin")
            if (custToken) {
              window.localStorage.clear();
              window.localStorage.setItem("customer-admin", res.token)
            }
            else {
              window.localStorage.setItem("customer-admin", res.token)
            }
            toast.success(res.message)
            router.push('/customer/dashboard')
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
    return (
        <>
            <div className="w-full outerdivGoo">
                <GoogleOAuthProvider clientId='605622970388-jos89fmacattlrgj1pu7ultb95beiu1s.apps.googleusercontent.com'>

                    <GoogleLogin width={`${divWidth}`} text="continue_with" size="large"
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                            const decodeData = decode(credentialResponse.credential as string)

                            onGoogleLoginFct(decodeData as DecodeGooGle)
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </GoogleOAuthProvider>
            </div>

        </>
    )
}

