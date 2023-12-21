import PolicyPage from '@/components/front/policypage/PolicyPage';
import FrontLayout from '@/components/layout/FrontLayout'
import { notFound } from 'next/navigation';

async function fetchtermPer(slug:string) {
  const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/terms-policy/front/${slug}`, {
    method: 'GET',
  })
  if (fetchApi.status !== 200) return notFound();
  const data = await fetchApi.json();
  return data;
}

export async function generateMetadata({ params }: { params: { slug: string }}) {
  const pagesData = await fetchtermPer(params.slug);
  const dataResult = pagesData.result[0];
  return {
    title: dataResult.metatitle,
    description: dataResult.metadiscription,
    alternates:{
      canonical:`/terms-policy/${params.slug}`
    }
  }
}

const TermPolicyPerPage = async ({ params }: { params: { slug: string }}) => {
  const fetchTermPolicy = await fetchtermPer(params.slug);

  return (
    <FrontLayout innercol='bg-gray-200'>
      <PolicyPage data={fetchTermPolicy.result[0].pagedata} classname={params.slug} title={fetchTermPolicy.result[0].pagename} />
    </FrontLayout>
  )
}


export default TermPolicyPerPage;
