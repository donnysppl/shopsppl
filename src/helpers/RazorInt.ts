const Razorpay = require('razorpay');
export const instance = new Razorpay({
    key_id: `${process.env.RAZORPAY_SECRET_ID}`,
    key_secret: `${process.env.RAZORPAY_SECRET_KEY}`,
});