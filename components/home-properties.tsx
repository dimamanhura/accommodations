import PropertyCard from '@/components/property-card';
import { db } from '@/db';
import Link from 'next/link';

const HomeProperties = async () => {
  const recentProperties = await db.property
    .findMany({
      take: 3,
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-4'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
            Recent Properties
          </h2>
          {recentProperties.length === 0 ? (
            <p>Mp properties found</p>
          ): (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {
                recentProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))
              }
            </div>
          )}
        </div>
      </section>
      <section className='m-auto max-w-lg my-6 px-6'>
        <Link href="/properties" className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-slate-500'>View All Properties</Link>
      </section>
    </>
  );
};

export default HomeProperties;

