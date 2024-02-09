import FrontLayout from '@/components/layout/FrontLayout';
import OnDemandLayout from '@/components/layout/OnDemandLayout';
import { Metadata } from 'next'


interface fetchProd {
    result: {
        result: any[];
        next: {
            page: number;
            limit: number;
        };
        prev: {
            page: number;
            limit: number;
        };
        totalPosts: number;
        totalPages: number;
    }
}



//  Static metadata
export const metadata: Metadata = {
    title: 'On Demand Sale | Shop',
    description: 'On Demand Sale | Shop',
    alternates: {
        canonical: `/on-demand-sale`
    }
}

export default function OnDemandSale({ searchParams }: {
    searchParams: {
        page: string, limit: string, brand: string, category: string
    }
}) {
    const pageParams = parseInt(searchParams.page ? searchParams.page : '1');
    const limitParams = parseInt(searchParams.limit);

    return (
        <FrontLayout innercol='bg-gray-200'>

            <div className="container mx-auto py-10 p-2">
                <h1 className='mb-4'>On Demand Sale</h1>


                <OnDemandLayout pt={'tv'} ct={'24inch,32inch,40inch,42inch,43inch,50inch,55inch'} />
            </div>
        </FrontLayout>
    )
}
