"use client";
import React, { useEffect, useCallback, useRef } from 'react'

export default function RazorpayOffer({ amountData,razorkey }) {
    const key = razorkey;
    const amount = Number(amountData * 100); 

    const initializeRazorpay = useCallback(() => {
        const widgetConfig = {
            key: key,
            amount: amount,
        };
        const rzpAffordabilitySuite = new window.RazorpayAffordabilitySuite(widgetConfig);
        rzpAffordabilitySuite.render();

        return () => {
            rzpAffordabilitySuite.close();
        };
    }, []);


    const i = useRef(true);

    useEffect(() => {
        const loadRazorpayScript = async () => {
            if (!window.RazorpayAffordabilitySuite) {
                const script = document.createElement('script');
                script.src = 'https://cdn.razorpay.com/widgets/affordability/affordability.js';
                script.async = true;
                script.onload = initializeRazorpay;
                document.body.appendChild(script);
            } else {
                initializeRazorpay();
            }
        };


        if (i.current) {
            i.current = false;
            loadRazorpayScript();
        }


    }, [initializeRazorpay]);

    return (
        <div id="razorpay-affordability-widget"> </div>
    )
}

