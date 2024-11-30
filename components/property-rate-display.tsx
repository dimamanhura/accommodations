import { Rates } from "@prisma/client";

interface PropertyRateDisplayProps {
  rates: Rates;
};

const PropertyRateDisplay = ({ rates }:PropertyRateDisplayProps) => {
  const getRateDisplay = () => {
    const { monthly, weekly, nightly } = rates;

    if (monthly) {
      return `$${monthly.toLocaleString()}/mo`;
    }

    if (weekly) {
      return `$${weekly.toLocaleString()}/wk`;
    }

    if (nightly) {
      return `$${nightly.toLocaleString()}/night`;
    }
  };

  return (
    <div className="absolute bg-white/70 top-2 left-2 px-4 py-2 z-10 rounded-lg font-bold text-black">
      {getRateDisplay()}
    </div>
  );
};

export default PropertyRateDisplay;
