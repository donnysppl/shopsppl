import Razorpay from 'Razorpay';

export const instance = new Razorpay({
    key_id: `${process.env.RAZORPAY_SECRET_ID}`,
    key_secret: `${process.env.RAZORPAY_SECRET_KEY}`,
});