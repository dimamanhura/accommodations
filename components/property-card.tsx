import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Property } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import PropertyRateDisplay from "@/components/property-rate-display";
import PropertyFacilities from "@/components/property-facilities";
import PropertyLocation from "@/components/property-location";

interface PropertyCardProps {
  property: Property;
};

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card>
      <CardHeader className="w-full h-64 relative">
        <Image className="w-full object-cover rounded-t-xl" fill src={`${property.images[0]}`} alt={property.name} />
        <PropertyRateDisplay rates={property.rates} />
      </CardHeader>
      <CardBody className="px-4 pt-4 flex-col items-start">
        <h4 className="font-bold text-large text-default-700">{property.name}</h4>
        <small className="text-default-500">{property.type}</small>
        <div className="mt-2">
          <PropertyFacilities property={property} />
        </div>
      </CardBody>
      <CardFooter className="flex justify-between px-4 pt-2 pb-6">
        <PropertyLocation location={property.location} />
        <Button color="primary" variant="light" href={`/properties/${property.id}`} as={Link}>
          Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;