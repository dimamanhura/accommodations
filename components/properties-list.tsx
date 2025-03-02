import PropertiesGrid from '@/components/properties-grid';
import PropertyCard from '@/components/property-card';
import { fetchProperties } from '@/db/queries/properties';

interface PropertiesListProps {
  pageSize: string;
  page: string;
};

const PropertiesList = async ({ pageSize, page }: PropertiesListProps) => {
  const properties = await fetchProperties({
    pageSize,
    page,
  });

  return (
    <PropertiesGrid>
      {
        properties.map(property => (
          <PropertyCard
            property={property}
            key={property.id}
          />
        ))
      }
    </PropertiesGrid>
  );
};

export default PropertiesList;
