import FrontLayout from '@/components/layout/FrontLayout'
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next'
import { Suspense } from 'react';

// either Static metadata
export const metadata: Metadata = {
  title: 'Terms Policy',
  description: 'Terms Policy',
  alternates: {
    canonical: `/terms-policy`
  }
}

async function fetchterm() {
  const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/terms-policy`, {
    method: 'GET',
  })
  if (fetchApi.status !== 200) return notFound();
  const data = await fetchApi.json();
  return data;
}

const TermsPolicyList = async () => {
  const fetchTermPolicy = await fetchterm();

  return (
    <FrontLayout innercol='bg-gray-200'>
      <div className='h-40 bg-prim'>
        <div className="max-w-2xl mx-auto text-center flex justify-center items-end h-full pb-5">
          <h1 className='font-bold text-4xl text-white uppercase'>Terms Policy</h1>
        </div>
      </div>
      <div className='container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8'>
        <div className="mx-auto max-w-screen-md ">
          <div className="flex flex-wrap -m-2">
            <Suspense>
              {
                fetchTermPolicy && fetchTermPolicy.result.map((item: any, index: number) => (

                  <div key={index} className="p-2 w-1/2">
                    <Link href={`/${item.slug}`}>
                      <div className="h-full flex items-center border-gray-200 border p-2.5 rounded-lg bg-white">
                        <img alt="team" className="w-16 h-16 p-1.5 bg-gray-100 object-contain object-center flex-shrink-0 rounded-md mr-4"
                          src={item.icon} />
                        <div className="flex-grow">
                          <h4 className="text-gray-900 title-font font-medium">{item.pagename}</h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              }
            </Suspense>
          </div>
        </div>
      </div>
    </FrontLayout>
  )
}


export default TermsPolicyList;
