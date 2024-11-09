import Pagination from '@/components/pagination';
import PropertyCard from '@/components/property-card';
import connectDB from '@/db/database';
import Property from '@/models/property';

interface PropertiesPageProps {
  searchParams: {
    pageSize?: string;
    page?: string;
  },
}

const PropertiesPage = async ({ searchParams: { page = '1', pageSize = '3' } }: PropertiesPageProps) => {
  await connectDB();
  const skip = (parseInt(page) - 1) * parseInt(pageSize);
  const total = await Property.countDocuments({});
  const properties = await Property
    .find({})
    .skip(skip)
    .limit(parseInt(pageSize))
    .lean();

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-4'>
        {properties.length === 0 ? (
          <p>Mp properties found</p>
        ): (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {
              properties.map(property => (
                <PropertyCard key={property._id} property={property} />
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
