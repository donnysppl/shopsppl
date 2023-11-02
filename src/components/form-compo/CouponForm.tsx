"use client";

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';

interface CoupFormProps {
    method: string,
    id?: string,
}
interface CoupInpProps {
    name: string,
    min_price: number,
    max_price: number,
    condition: string,
    discount: number,
    multiuse: boolean,
}

const couponcondi = [
    { name: 'Price (₹)', value: 'price' },
    { name: 'Percentage (%)', value: 'percentage' }
]

export default function CouponForm({ method, id }: CoupFormProps) {

    const [couponInp, setcouponInp] = useState<CoupInpProps>({
        name: '',
        min_price: 0,
        max_price: 0,
        condition: '',
        discount: 0,
        multiuse: false,
    });
    const [loader, setloader] = useState<boolean>(false);

    useEffect(() => {
        const fetchCouponData = async () => {
            setloader(true);
            await fetch(`/api/product/coupon/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                        setcouponInp(res.result);
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
        fetchCouponData();
    }, [id])
    

    const onCouponSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloader(true);
        console.log(couponInp);

        const couponURL = id ? `/api/product/coupon/${id}` : '/api/product/coupon';

        await fetch(couponURL, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(couponInp),
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
        <form onSubmit={onCouponSubmit} className='relative max-w-sm mx-auto'>
            {
                loader ? <Loader /> : null
            }
            <div className="mb-4 form-inp">
                <label htmlFor="name" className="form-label">Coupon Name</label>
                <input type="text" name='name' className="form-ctrl" placeholder='Coupon Name' required
                    onChange={(e) => setcouponInp({ ...couponInp, name: e.target.value })}
                    value={'' || couponInp.name}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="name" className="form-label">Coupon Min Price</label>
                <input type="number" name='name' className="form-ctrl" placeholder='Coupon Min Price' required
                    onChange={(e) => setcouponInp({ ...couponInp, max_price: parseInt(e.target.value) })}
                    value={'' || couponInp.min_price}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="name" className="form-label">Coupon Max Price</label>
                <input type="number" name='name' className="form-ctrl" placeholder='Coupon Max Price' required
                    onChange={(e) => setcouponInp({ ...couponInp, max_price: parseInt(e.target.value) })}
                    value={'' || couponInp.max_price}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="name" className="form-label">Coupon Discount</label>
                <input type="number" name='name' className="form-ctrl" placeholder='Coupon Discount' required
                    onChange={(e) => setcouponInp({ ...couponInp, discount: parseInt(e.target.value) })}
                    value={'' || couponInp.discount}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="name" className="form-label">Coupon Condition</label>
                <select className="form-ctrl" onChange={(e) => setcouponInp({ ...couponInp, condition: e.target.value })} required
                    value={'' || couponInp.condition} >
                    <option selected>Open this select menu</option>
                    {
                        couponcondi.map((item: any, index: number) => (
                            <option key={index} value={item.value}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="mb-4 form-check ">
                <input type="checkbox" className="form-ctrl checkbox cursor-pointer" id="isInStock" name="isInStock" 
                    onChange={(e) => setcouponInp({ ...couponInp, multiuse: e.target.checked })}
                    checked={couponInp.multiuse} />
                <label className="form-label cursor-pointer" htmlFor="isInStock">Multiple Useage</label>
            </div>

            <button type='submit' className='dashboard-btn'>Submit</button>

        </form>
    )
}
