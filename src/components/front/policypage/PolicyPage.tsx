'use client';
import Link from "next/link";
import { BiHomeAlt,BiChevronRight } from "react-icons/bi";

interface pageProps{
    data:string;
    classname:string;
    title:string;
}


export default function PolicyPage({data,classname,title}:pageProps) {

    return (
        <div className='container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8'>
            <div className="mx-auto max-w-screen-md content-part">
                <nav className="flex pt-4 text-[0.8rem]" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-prim ">
                                <BiHomeAlt className="w-4 h-4 mr-2.5" />
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <BiChevronRight className="w-5 h-5 text-gray-400" />
                                <Link href="/terms-policy" className="ml-1 text-sm font-medium text-gray-700 hover:text-prim md:ml-2 ">Terms Policy</Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <BiChevronRight className="w-5 h-5 text-gray-400" />
                                <a className="ml-1 text-sm font-medium text-gray-700 hover:text-prim md:ml-2 ">{title}</a>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className={`${classname} py-5 lg:py-8`} dangerouslySetInnerHTML={{ __html: data }} />
            </div>
        </div>
    )
}
