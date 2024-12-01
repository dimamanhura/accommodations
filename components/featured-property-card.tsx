import { Button, Divider } from "@nextui-org/react";
import { Property } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import PropertyRentOptions from "@/components/property-rent-options";
import PropertyRateDisplay from "@/components/property-rate-display";
import PropertyFacilities from "@/components/property-facilities";
import PropertyLocation from "@/components/property-location";
import paths from "@/utils/paths";

interface PropertyCardProps {
  property: Property;
};

const FeaturedPropertyCard = ({ property }:PropertyCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md relative flex">
      <PropertyRateDisplay rates={property.rates} />

      <Image
        width={0}
        height={0}
        sizes="100vw"
        src={property.images[0]}
        alt=""
        className="h-auto rounded-l-xl w-2/5"
      />

      <div className="p-6 w-3/5 flex flex-col justify-between">
        <div className="flex flex-col">
          <h3 className="font-bold text-large text-default-700">{property.name}</h3>
          <small className="text-default-500">{property.type}</small>

          <div className="flex justify-center mt-4">
            <PropertyFacilities property={property} />
          </div>

          <div className="flex justify-center mt-4">
            <PropertyRentOptions rates={property.rates} />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <Divider className="mb-2" />
          <div className="flex justify-between w-full">
            <PropertyLocation location={property.location} />
            <Button color="primary" variant="light" href={paths.propertyDetails(property.id)} as={Link}>
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default FeaturedPropertyCard;