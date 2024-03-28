import { collectionData } from '@/lib/actions'
import Link from 'next/link';
import React from 'react'

export default async function collections() {

    const fetchCollectionData = await collectionData();
  return (
    <section>
        <div className="container">
            <div className='flex flex-col'>
            {
                fetchCollectionData && fetchCollectionData.map((item,index)=>(
                  <Link href={`/collections/${item.slug}`} key={index}>{item.name} </Link> 
                ))
            }
            </div>
        </div>
    </section>
  )
}
