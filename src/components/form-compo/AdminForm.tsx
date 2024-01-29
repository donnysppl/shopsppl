"use client";
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Loader from '../Loader';

type BlogFormProps = {
    method: string,
    id?: string,
}

export default function AdminForm({ method, id }: BlogFormProps) {

    const [adminInp, setadminInp] = useState({
        email: '',
        username: '',
        password: '',
        adminRole: ''
    })
    const [loader, setloader] = useState<Boolean>(false)

    useEffect(() => {
        const bannerPrevData = async () => {
            setloader(true)
            await fetch(`/api/admin/list/${id}`, {
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                        setadminInp(res.result);
                    }
                    else if (res.status === 500) {
                        toast.error(res.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            setloader(false)
        }
        if (id) {
            bannerPrevData();
        }

    }, [id])


    const adminRole = [
        { title: 'Main Admin' },
        { title: 'Post Admin' },
        { title: 'Service Admin' }
    ]

    const adminURL = id ? `/api/admin/${id}` : '/api/admin/signup';

    const onAdminSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloader(true);

        await fetch(adminURL,{
            method : method,
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(adminInp),
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                toast.success(res.message);
                window.location.reload();
            }
            else if (res.status === 400) {
                toast.error(res.message);
            }
            else if (res.status === 500) {
                toast.error(res.message);
            }
            setloader(false);
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <form className='p-3 relative' onSubmit={onAdminSubmit} >
            {
                loader ? <Loader /> : null
            }
            <div className="mb-4 form-inp">
                <label htmlFor="adminRole" className="form-label">Admin Role</label>
                <select name='adminRole' className="form-ctrl" required value={'' || adminInp.adminRole}
                 onChange={(e) => setadminInp({ ...adminInp, adminRole: e.target.value })}>
                    <option  value=''>Select admin role</option>
                    {
                        adminRole.map((item, index) => (
                            <option key={index} value={item.title}>{item.title}</option>
                        ))
                    }
                </select>
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="email" className="form-label">Admin Email</label>
                <input type="email" name='email' className="form-ctrl" placeholder='Admin email' required
                    onChange={(e) => setadminInp({ ...adminInp, email: e.target.value })}
                    value={'' || adminInp.email}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="username" className="form-label">Admin Username</label>
                <input type="text" name='username' className="form-ctrl" placeholder='Admin username' required
                    onChange={(e) => setadminInp({ ...adminInp, username: e.target.value })}
                    value={'' || adminInp.username}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="password" className="form-label">Admin Password</label>
                <input type="text" name='password' className="form-ctrl" placeholder='Admin password' required
                    onChange={(e) => setadminInp({ ...adminInp, password: e.target.value })}
                    value={'' || adminInp.password}
                />
            </div>



            <button type='submit' className='dashboard-btn'>Submit</button>
        </form>
    )
}
