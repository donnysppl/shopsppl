import FrontLayout from '@/components/layout/FrontLayout'
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BsArrowDownShort } from "react-icons/bs";

async function fetchSingleBlog(slug: string) {
    const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/front/${slug}`, {
        method: 'GET',
        next: { revalidate: 10 },
    })
    if (fetchApi.status !== 200) return notFound();
    const data = fetchApi.json();
    return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const pagesData = await fetchSingleBlog(params.slug);
    const dataResult = pagesData.result;
    return {
        title: dataResult.metatitle,
        description: dataResult.metadiscription,
        alternates: {
            canonical: `/terms-policy/${params.slug}`
        }
    }
}


export default async function BlogDetails({ params }: { params: { slug: string } }) {
    const pagesData = await fetchSingleBlog(params.slug);
    const dataResult = pagesData.result;

    return (
        <FrontLayout innercol={'bg-white'}>
            <div className="blog-detail-data">
                <div className="main-img w-full h-full overflow-hidden relative text-white">
                    {/* <img className='w-full h-full object-cover object-center bg-overlay bg-blend-multiply'
                        src="https://assets-global.website-files.com/63c0810afc574dff4625bbd4/63c08718be56c34382b452cc_main_1.jpg"
                        alt="" /> */}
                    <Image src={dataResult?.img} width={1600} height={600} alt={dataResult?.title}
                        sizes="(min-width: 1280px) 100wv, (min-width: 1040px) 100wv, (min-width: 780px) 100wv, (min-width: 600px) 100wv, 100wv" />

                    <div className='absolute inset-0 font-bold text-white text-2xl backdrop-brightness-50
                     flex overflow-x-auto w-full h-full justify-center items-center flex-col'>
                        <div className="max-w-screen-2xl mx-auto py-2 px-4 row flex gap-2 justify-between flex-col">
                            <div className="md:w-1/2 w-full p-2.5">
                                <h1 className='md:text-[2.5rem] text-base  font-semibold mb-2.5 leading-snug'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, ab.</h1>
                            </div>
                        </div>

                    </div>
                    <div className="down-arrow text-white absolute bottom-3 left-1/2 border border-white rounded-full p-1 blog-down-arrow">
                        <BsArrowDownShort className='w-8 h-8 ' />
                    </div>

                </div>
                <div className='container mx-auto xl:px-5  max-w-screen-lg py-2.5 px-2.5 lg:py-8'>
                    <div className="mx-auto max-w-screen-md content-part">
                        <div className={`py-5 lg:py-8`} dangerouslySetInnerHTML={{ __html: dataResult?.blogdata }} />
                    </div>
                </div>
            </div>
        </FrontLayout>
    )
}
