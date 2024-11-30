import { Location} from "@prisma/client";
import { FaMapMarker } from "react-icons/fa";

interface PropertyLocationProps {
  location: Location;
};

const PropertyLocation = ({ location }: PropertyLocationProps) => {
  return (
    <div className="flex gap-2 text-small items-center text-default-500">
      <FaMapMarker /> 
      <span>{location.city}, {location.street}</span>
    </div>
  );
};

export default PropertyLocation;