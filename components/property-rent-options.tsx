import { Rates } from "@prisma/client";
import { FaCheck, FaTimes } from "react-icons/fa";

interface PropertyRentOptionsProps {
  rates: Rates;
};

const PropertyRentOptions = ({ rates }: PropertyRentOptionsProps) => {
  const renderOption = (title: string, rate?: number | null) => {
    return (
      <div className="flex gap-2 items-center text-small">
        {rate ? (
          <FaCheck className="text-success" />
        ): (
          <FaTimes className="text-danger" />
        )}
        <span>{title}</span>
      </div>
    );
  };

  return (
    <div className="flex gap-4">
      {renderOption('Nightly', rates.nightly)}
      {renderOption('Weekly', rates.weekly)}
      {renderOption('Monthly', rates.monthly)}
    </div>
  )
};

export default PropertyRentOptions;