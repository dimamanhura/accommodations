import { Suspense } from 'react';
import { getPropertiesTotal } from '@/db/queries/properties';
import PropertiesListLoading from '@/components/properties-list-loading';
import PropertiesList from '@/components/properties-list';
import Pagination from '@/components/pagination';

interface PropertiesPageProps {
  searchParams: Promise<{ pageSize?: string; page?: string; }>,
};

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  const { pageSize = '3', page = '1' } = await searchParams;
  const total = await getPropertiesTotal();

  return (
    <>
      <Suspense key={page} fallback={<PropertiesListLoading />}>
        <PropertiesList
          pageSize={pageSize}
          page={page}
        />
      </Suspense>
      <Pagination
        totalItems={total}
        pageSize={parseInt(pageSize)}
        page={parseInt(page)}
      />
    </>
  );
};

export default PropertiesPage;
