import FrontLayout from '@/components/layout/FrontLayout'
import Link from 'next/link'
import { Metadata } from 'next'
 
// either Static metadata
export const metadata: Metadata = {
    title: 'Blogs',
    description: 'Blogs',
    alternates: {
        canonical: `/blog`
    }
}

export default function BlogList() {
    return (
        <FrontLayout innercol={'bg-white'}>
            <div className="container mx-auto md:px-8 px-4 py-5">
                <div>
                    <h1 className='font-semibold mb-5' >Blog Posts</h1>
                </div>


                <ul className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                    <li className="border border-gray-100 rounded-2xl overflow-hidden p-2.5 bg-white hover:shadow-xl transition-all blog-post-li animate-pulse">
                        <div className="flex flex-col gap-1">
                            <div className="overflow-hidden rounded-lg bg-gray-400 w-full h-[250px]" />
                            <div className="p-1.5">
                                <div className='bg-gray-400 inline-block text-gray-100 text-[0.65rem] px-1.5 py-1 rounded-2xl mb-1 h-5 w-14' />
                                <div className='bg-gray-400 w-full h-2.5 mb-2 rounded-xl' />
                                <div className='bg-gray-400 w-1/2 h-2.5 mb-4 rounded-xl' />
                                <div className='bg-gray-400 w-full h-2.5 mb-2 rounded-xl' />
                                <div className='bg-gray-400 w-full h-2.5 mb-2 rounded-xl' />
                                <div className='bg-gray-400 w-40 h-8 rounded-2xl' />
                            </div>
                        </div>
                    </li>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: any, index: number) => (
                            <li key={index} className="border border-gray-100 rounded-2xl overflow-hidden p-2.5 bg-white hover:shadow-xl transition-all blog-post-li">
                                <div className="flex flex-col gap-1">
                                    <div className="overflow-hidden rounded-lg">
                                        <img className=''
                                            src="https://assets.website-files.com/64c2e60403eef3ab6fec4b53/64c9b3a304f992478f97e3a4_exploring-off-featured-image-journal-x-webflow-template.jpg" alt="" />
                                    </div>
                                    <div className="p-1.5">
                                        <div className='bg-gray-600 inline-block text-gray-100 text-[0.65rem] px-1.5 py-1 rounded-2xl mb-1'>Sep 1, 2023</div>
                                        <h2 className='md:text-lg text-base  font-semibold mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, ab.</h2>
                                        <p className='md:text-base text-sm line-clamp-2 mb-2.5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perferendis inventore porro culpa, eligendi, ex quasi facere repellendus iure quibusdam soluta accusamus asperiores! Voluptatum et dolor maxime quis nemo amet.</p>
                                        <Link className='btn-prim' href={'/'}>Read More</Link>
                                    </div>
                                </div>
                            </li>
                        ))
                    }

                </ul>

            </div>
        </FrontLayout>
    )
}
