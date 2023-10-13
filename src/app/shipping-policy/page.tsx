import { notFound } from 'next/navigation';
import FrontLayout from '@/components/layout/FrontLayout';

async function pagesShipment() {
    const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pages/front/shipping-policy`, {
        method: 'GET',
    })
    if (fetchApi.status !== 200) return notFound();
    const data = fetchApi.json();
    return data;
}
export async function generateMetadata() {
  return {
    title: 'Shipping Policy',
    description: 'Shipping Policy',
    alternates:{
      canonical:`/shipping-policy`
    }
  }
}

export default async function ShippingPolicy() {

    const pagesData = await pagesShipment();
    const dataResult = pagesData.result;

    return (
        <FrontLayout innercol='bg-gray-200'>
            <div className='container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8'>
                <div className="mx-auto max-w-screen-md ">
                    <div dangerouslySetInnerHTML={{ __html: dataResult[0].pagedata }} />
                </div>
            </div>
        </FrontLayout>
    )
}
