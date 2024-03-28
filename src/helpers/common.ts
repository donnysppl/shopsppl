import { Product } from "./interFace";

export let mailTransport = {
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  auth: {
    user: process.env.MAIL_SMTP_USER,
    pass: process.env.MAIL_SMTP_PASS,
  }
}

export function priceFormat(price:number){
  const formattedPrice = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
    return formattedPrice
}

export function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  array.sort((a: any, b: any) => { return b.inStock - a.inStock })
  return array;
}