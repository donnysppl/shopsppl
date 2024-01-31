import FrontLayout from '@/components/layout/FrontLayout'
import { Metadata } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GrNext } from "react-icons/gr";

export const metadata: Metadata = {
    title: 'Blogs',
    description: 'Blogs',
    alternates: {
        canonical: `/blog`
    }
}

async function fetchBlogData(page: number, limit: number) {
    console.log(page, limit)
    const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/front?page=${page ? page : 1}&limit=${limit ? limit : 12}`, {
        method: 'GET',
        next: { revalidate: 10 },
    })
    if (fetchApi.status !== 200) return notFound();
    const data = fetchApi.json();
    return data;
}


export default async function BlogList({ searchParams }: {
    searchParams: {
        page: string, limit: string
    }
}) {
    // console.log(searchParams)

    const page = parseInt(searchParams.page);
    const limit = parseInt(searchParams.limit);

    const fetchBlog = await fetchBlogData(page, limit);

    return (
        <FrontLayout innercol={'bg-white'}>
            <div className="container mx-auto md:px-8 px-4 py-5">
                <div>
                    <h1 className='font-semibold mb-5' >Blog Posts</h1>
                </div>

                <ul className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                    {/* {
                        loading ?
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
                            </li> : null
                    } */}

                    {
                        fetchBlog.result && fetchBlog.result.result.map((item: any, index: number) => (
                            <li key={index} className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all blog-post-li">
                                <div className="flex flex-col gap-1">
                                    <div className="overflow-hidden rounded-lg">
                                        <Image sizes="(min-width: 1540px) 455px, (min-width: 1280px) 370px, (min-width: 1040px) 284px, (min-width: 780px) 320px, (min-width: 600px) 500px, calc(90.71vw - 26px)"
                                            src={item.img} alt={item.title} width={500} height={300}  
                                        />
                                    </div>
                                    <div className="p-3">
                                        <div className='bg-gray-600 inline-block text-gray-100 text-[0.65rem] px-1.5 py-1 rounded-2xl mb-1'>Sep 1, 2023</div>
                                        <h2 className='md:text-lg text-base  font-semibold mb-2'>{item.title}</h2>
                                        {/* <p className='md:text-base text-sm line-clamp-2 mb-2.5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perferendis inventore porro culpa, eligendi, ex quasi facere repellendus iure quibusdam soluta accusamus asperiores! Voluptatum et dolor maxime quis nemo amet.</p> */}
                                        <Link className='btn-prim' href={`/blog/${item.slug}`}>Read More</Link>
                                    </div>
                                </div>
                            </li>
                        ))
                    }

                </ul>

                <div className='flex gap-4 justify-between items-center py-4' >
                    <div>
                        <div>Page {page ? page : 1} to {fetchBlog.result?.totalPages}</div>

                    </div>

                    <div className='flex gap-3'>
                        {
                            fetchBlog.result?.prev ?
                                <div className="next ">
                                    <Link className='btn-prim gap-2' href={`?${new URLSearchParams({
                                        page: fetchBlog.result.prev.page.toString(), limit: searchParams.limit
                                    })}`}><GrNext className='rotate-180' /> Prev</Link>
                                </div> : null
                        }
                        {
                            fetchBlog.result?.next ?
                                <div className="next">
                                    <Link className='btn-prim gap-2' href={`?${new URLSearchParams({
                                        page: fetchBlog.result.next.page.toString(), limit: searchParams.limit
                                    })}`}>Next <GrNext /></Link>
                                </div> : null
                        }


                    </div>
                </div>

            </div>
        </FrontLayout>
    )
}
