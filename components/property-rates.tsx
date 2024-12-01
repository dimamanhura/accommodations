import { Rates } from "@prisma/client";
import { FaTimes } from "react-icons/fa";

interface PropertyRatesProps {
  rates: Rates;
};

const PropertyRates = ({ rates }: PropertyRatesProps) => {
  const renderRate = (title: string, rate?: number | null) => (
    <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
      <div className="text-gray-500 mr-2 font-bold">{title}</div>
      {!!rate ? (
        <div className="text-2xl font-bold text-blue-500">${rate.toLocaleString()}</div>
      ) : (
        <FaTimes className="text-red-700"/>
      )}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row justify-around">
      {renderRate('Nightly', rates.nightly)}
      {renderRate('Weekly', rates.weekly)}
      {renderRate('Monthly', rates.monthly)}
    </div>
  );
};

export default PropertyRates;
