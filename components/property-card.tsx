import { Button, Card, CardBody, CardFooter, CardHeader, Skeleton } from "@nextui-org/react";
import { Property } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import PropertyRateDisplay from "@/components/property-rate-display";
import PropertyFacilities from "@/components/property-facilities";
import PropertyLocation from "@/components/property-location";
import paths from "@/utils/paths";

interface PropertyCardProps {
  property?: Property;
  loading?: boolean;
};

const PropertyCard = ({ property, loading }: PropertyCardProps) => {
  return (
    <Card>
      <CardHeader className="w-full h-64 relative">
        {(loading || !property) ? (
          <Skeleton className="w-full h-full p-0 m-0 rounded-t-xl" />
        ) : (
          <>
            <Image className="w-full object-cover rounded-t-xl" fill src={`${property.images[0]}`} alt={property.name} />
            <PropertyRateDisplay rates={property.rates} />
          </>
        )}
      </CardHeader>
      <CardBody className="px-4 pt-4 flex-col items-start">
        {(loading || !property) ? (
          <>
            <Skeleton className="w-56 h-6" />
            <Skeleton className="w-24 h-4 mt-2" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="w-24 h-6 rounded-full" />
              <Skeleton className="w-24 h-6 rounded-full" />
              <Skeleton className="w-24 h-6 rounded-full" />
            </div>
          </>
        ) : (
          <>
            <h4 className="font-bold text-large text-default-700">
              {property.name}
            </h4>
            <small className="text-default-500">
              {property.type}
            </small>
            <div className="mt-2">
              <PropertyFacilities property={property} />
            </div>
          </>
        )}
      </CardBody>
      <CardFooter className="flex justify-between px-4 pt-2 pb-6">
        {(loading || !property) ? (
          <>
            <Skeleton className="w-36 h-6" />
            <Skeleton className="w-32 h-6 rounded-md" />
          </>
        ) : (
          <>
            <PropertyLocation location={property.location} />
            <Button color="primary" variant="light" href={paths.propertyDetails(property.id)} as={Link}>
              Details
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;