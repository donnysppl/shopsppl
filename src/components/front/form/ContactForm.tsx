'use client';

import Loader from "@/components/Loader";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm({type}:{type:string}) {

    const [constFormInp, setconstFormInp] = useState({
        name:'',
        email:'',
        phone:'',
        message:'',
        type:type,
    });
    const [loading, setloading] = useState<boolean>(false);
    const [thankMsg, setthankMsg] = useState<boolean>(false);

    const contactDataSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloading(true);

        await fetch('/api/contact',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(constFormInp),
        }).then(res => res.json())
        .then(res => {
            if (res.status === 200) {
                toast.success(res.message);
                setTimeout(() => {
                    window.location.reload();
                }, 4000);
            }
            else if (res.status === 400) {
                toast.error(res.message);
            }
            else if (res.status === 500) {
                toast.error(res.message);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <>
        {
            loading ? <Loader /> : null
        }
        <form  onSubmit={contactDataSubmit} >
            <input className="w-full bg-gray-100 text-gray-900 mb-4 px-3 py-2 rounded-lg focus:outline-none focus:shadow-outline"
                type="text" placeholder="Name*" onChange={(e) => setconstFormInp({ ...constFormInp, name: e.target.value })} required
                value={'' || constFormInp.name} />

            <input className="w-full bg-gray-100 text-gray-900 mb-4 px-3 py-2 rounded-lg focus:outline-none focus:shadow-outline"
                type="text" placeholder="Email*" onChange={(e) => setconstFormInp({ ...constFormInp, email: e.target.value })} required
                value={'' || constFormInp.email} />

            <input className="w-full bg-gray-100 text-gray-900 mb-4 px-3 py-2 rounded-lg focus:outline-none focus:shadow-outline"
                type="text" placeholder="Phone no*" onChange={(e) => setconstFormInp({ ...constFormInp, phone: e.target.value })} required
                value={'' || constFormInp.phone} />

            <textarea placeholder="Message*" required className="w-full h-32 bg-gray-100 text-gray-900 mb-3 p-3 rounded-lg focus:outline-none focus:shadow-outline" onChange={(e) => setconstFormInp({ ...constFormInp, message: e.target.value })}
                value={'' || constFormInp.message} ></textarea>

            <button className='btn-prim' type='submit'>Submit</button>
        </form>
        </>
    )
}
