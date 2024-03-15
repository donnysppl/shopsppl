import FrontLayout from '@/components/layout/FrontLayout'
import Link from 'next/link'

export default function NotFound() {
  return (
    <FrontLayout innercol={'bg-gray-100'}>

      <section className='p-10'>
        <div className="max-w-5xl mx-auto p-5">

          <div className="flex items-center gap-10">

            <div className='w-[70%]'>
              <img src="/not-found.svg" alt="not-found.svg" className='w-full object-cover object-center' />
            </div>

            <div className="text-part text-center">
              <h1 className='text-9xl'>404</h1>
              <p className='text-2xl mb-3'>Page Not Found</p>

              <Link href={'/'} className='btn-prim'>Go To Home</Link>
            </div>
          </div>

        </div>
      </section>
    </FrontLayout>
  )
}
