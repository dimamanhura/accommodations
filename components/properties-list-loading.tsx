import PropertiesGrid from "@/components/properties-grid";
import PropertyCard from "@/components/property-card";

const PropertiesListLoading = () => {
  return (
    <PropertiesGrid>
      {[...Array(9)].map((item, index) => (
        <PropertyCard loading key={index} />
      ))}
    </PropertiesGrid>
  );
};

export default PropertiesListLoading;
