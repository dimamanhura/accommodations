import Pagination from '@/components/pagination';
import PropertyCard from '@/components/property-card';
import { db } from '@/db';

interface PropertiesPageProps {
  searchParams: Promise<{ pageSize?: string; page?: string; }>,
}

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  const { pageSize = '3', page = '1' } = await searchParams;
  const skip = (parseInt(page) - 1) * parseInt(pageSize);
  const total = await db.property.count();
  const properties = await db.property.findMany({
    skip: skip,
    take: parseInt(pageSize),
  });

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-4'>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ): (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {
              properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))
            }
          </div>
        )}
        <Pagination
          totalItems={total}
          pageSize={parseInt(pageSize)}
          page={parseInt(page)}
        />
      </div>
    </section>
  )
};

export default PropertiesPage;
