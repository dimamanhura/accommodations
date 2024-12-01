import { Property } from "@prisma/client";
import { Chip } from "@nextui-org/react";
import PropertyDetailsSection from "@/components/property-details-section";
import PropertyFacilities from "@/components/property-facilities";
import PropertyAmenities from "@/components/property-amenities";
import PropertyLocation from "@/components/property-location";
import PropertySeller from "@/components/property-seller";
import PropertyRates from "@/components/property-rates";

interface PropertyDetailsProps {
  property: Property;
};

const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  return (
    <main>
      <PropertyDetailsSection>
        <h2 className="text-3xl font-bold mb-2">
          {property.name}
        </h2>

        <div className="mb-4">
          <PropertyLocation location={property.location} />
        </div>

        <h3 className="text-lg font-bold mb-4">Rates & Options</h3>

        <PropertyRates rates={property.rates} />

        <Chip className="absolute top-4 right-4" variant="flat" color="primary" radius="sm" size="lg">
          {property.type}
        </Chip>
      </PropertyDetailsSection>

      <PropertyDetailsSection title="Description & Details">
        <p className="text-gray-500 mb-6">
          {property.description}
        </p>
        <PropertyFacilities property={property} />
      </PropertyDetailsSection>

      <PropertyDetailsSection title="Amenities">
        <PropertyAmenities amenities={property.amenities} />
      </PropertyDetailsSection>

      <PropertyDetailsSection title="Seller">
        <PropertySeller seller={property.seller} />
      </PropertyDetailsSection>
    </main>
  );
}

export default PropertyDetails;