import LoaderFront from '@/components/front/Loader';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function GoogleBtnLogin({ title }: { title: string }) {

    const [loading, setloading] = useState<boolean>(false)
    const login = useGoogleLogin({
        onSuccess: async (codeResponse: any) => {
            setloading(true);
            await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`, {
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    googleAfterLogin(res);
                })
        }
    });

    const googleAfterLogin = async (data: any) => {
        setloading(true);
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customeruser/googlelogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.data.status === 200) {

                  setloading(false);
                }
                else if (res.data.status === 404) {
                  toast.error(res.data.message);
                  setloading(false);
                }
                else if (res.data.status === 401) {
                  toast.error(res.data.message);
                  setloading(false);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (

        <>
        {
            loading ? <LoaderFront /> : null
        }
            <button onClick={() => login()} className="google-btn">
                <img className="w-6 h-6" src="/google.svg" alt="google logo" />
                <span>{title} with Google</span>
            </button>
        </>
    )
}
