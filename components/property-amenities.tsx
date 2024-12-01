import { FaCheck } from "react-icons/fa";
import amenitiesOptions from "@/amenities";

interface PropertyAmenitiesProps {
  amenities: string[];
};

const PropertyAmenities = ({ amenities }: PropertyAmenitiesProps) => {
  const getAmenityLabelByValue = (amenity: string) => {
    return amenitiesOptions.find(({ value }) => value === amenity)?.label || amenity;
  };

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
      {amenities.map((amenity: string, index: number) => (
        <li key={index}>
          <FaCheck className="inline-block text-success mr-2" /> {getAmenityLabelByValue(amenity)}
        </li>
      ))}
    </ul>
  );
};

export default PropertyAmenities;