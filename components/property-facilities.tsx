import {Chip } from "@nextui-org/react";
import { Property } from "@prisma/client";
import {
  FaRulerCombined,
  FaBath,
  FaBed,
} from "react-icons/fa";

interface PropertyFacilitiesProps {
  property: Property;
};

const PropertyFacilities = ({ property }: PropertyFacilitiesProps) => {
  return (
    <div className="flex gap-2">
      <Chip startContent={<FaBed />} className="pl-4 pr-2" variant="flat" color="primary">
        {property.beds} Beds
      </Chip>
      <Chip startContent={<FaBath />} className="pl-4 pr-2" variant="flat" color="primary">
        {property.baths} Baths
      </Chip>
      <Chip startContent={<FaRulerCombined />} className="pl-4 pr-2" variant="flat" color="primary">
        {property.squareFeet} sqft
      </Chip>
    </div>
  );
};

export default PropertyFacilities;
